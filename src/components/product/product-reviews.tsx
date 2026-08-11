"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Star, Trash2 } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiError, type ApiReview, deleteMyReview, fetchReviews, upsertMyReview } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 text-ember" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          aria-hidden="true"
          fill={value <= rating ? "currentColor" : "none"}
          key={value}
          size={14}
        />
      ))}
    </div>
  );
}

export function ProductReviews({ slug }: { slug: string }) {
  const router = useRouter();
  const { token, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<ApiReview[] | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const myReview = reviews?.find((review) => review.mine);

  useEffect(() => {
    fetchReviews(slug, token)
      .then((page) => setReviews(page.content))
      .catch(() => setReviews([]));
  }, [slug, token]);

  useEffect(() => {
    if (myReview) {
      setRating(myReview.rating);
      setComment(myReview.comment ?? "");
    }
  }, [myReview?.id, myReview?.rating, myReview?.comment]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || isSubmitting) {
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const form = new FormData(event.currentTarget);

    try {
      const review = await upsertMyReview(
        slug,
        { rating, comment: String(form.get("comment") ?? "") || undefined },
        token
      );

      setReviews((current) => {
        const withoutMine = (current ?? []).filter((item) => item.id !== review.id);
        return [review, ...withoutMine];
      });
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't submit your review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!token || isDeleting || !myReview) {
      return;
    }

    setError(null);
    setIsDeleting(true);

    try {
      await deleteMyReview(slug, token);
      setReviews((current) => (current ?? []).filter((review) => !review.mine));
      setRating(5);
      setComment("");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't delete your review. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <section className="mt-24">
      <Container>
        <SectionHeader
          eyebrow="Reviews"
          title="What customers are saying"
          description="Real feedback from people who bought this product."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="grid gap-4">
            {reviews === null ? (
              <>
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
              </>
            ) : reviews.length === 0 ? (
              <p className="text-sm text-silver">No reviews yet — be the first to leave one.</p>
            ) : (
              reviews.map((review) => (
                <div
                  className="rounded-lg border border-white/10 bg-white/[0.035] p-5"
                  key={review.id}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-platinum">{review.reviewerName}</p>
                    <Stars rating={review.rating} />
                  </div>
                  {review.comment ? (
                    <p className="mt-3 text-sm leading-6 text-silver">{review.comment}</p>
                  ) : null}
                  <p className="mt-3 text-xs text-muted">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>

          {isAuthenticated ? (
            <form
              className="h-fit rounded-lg border border-white/10 bg-white/[0.045] p-5"
              onSubmit={handleSubmit}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-platinum">
                  {myReview ? "Edit your review" : "Leave a review"}
                </h3>
                {myReview ? (
                  <button
                    aria-label="Delete your review"
                    className="rounded-lg p-2 text-muted transition hover:bg-white/10 hover:text-red-200"
                    disabled={isDeleting}
                    onClick={handleDelete}
                    type="button"
                  >
                    <Trash2 aria-hidden="true" size={16} />
                  </button>
                ) : null}
              </div>

              {error ? (
                <div
                  className="mt-3 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200"
                  role="alert"
                >
                  <AlertCircle aria-hidden="true" className="mt-0.5 flex-none" size={14} />
                  <p>{error}</p>
                </div>
              ) : null}

              <div aria-label="Rating" className="mt-4 flex items-center gap-1" role="group">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    aria-label={`Rate ${value} out of 5`}
                    aria-pressed={rating === value}
                    className="text-ember"
                    key={value}
                    onClick={() => setRating(value)}
                    type="button"
                  >
                    <Star aria-hidden="true" fill={value <= rating ? "currentColor" : "none"} size={20} />
                  </button>
                ))}
              </div>

              <label className="mt-4 block" htmlFor="review-comment">
                <span className="mb-2 block text-sm text-silver">Comment (optional)</span>
                <textarea
                  className="input-shell min-h-24 px-4 py-3"
                  id="review-comment"
                  name="comment"
                  onChange={(event) => setComment(event.target.value)}
                  rows={4}
                  value={comment}
                />
              </label>

              <Button className="mt-4 w-full" disabled={isSubmitting || isDeleting} type="submit">
                {isSubmitting ? "Submitting..." : myReview ? "Update review" : "Submit review"}
              </Button>
            </form>
          ) : (
            <div className="h-fit rounded-lg border border-white/10 bg-white/[0.045] p-5 text-sm text-silver">
              <Link className="font-medium text-platinum hover:underline" href="/login">
                Sign in
              </Link>{" "}
              to leave a review.
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
