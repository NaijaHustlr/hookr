
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface Review {
  id: string;
  userName: string;
  rating: number;
  content: string;
  date: string;
}

interface ProfileReviewsProps {
  reviews: Review[];
}

const ProfileReviews: React.FC<ProfileReviewsProps> = ({
  reviews
}) => {
  return (
    <Card className="bg-hookr-muted border-hookr-muted">
      <CardContent className="p-4">
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="border-b border-hookr-light border-opacity-10 pb-4 last:border-0">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-hookr-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {review.userName.charAt(0)}
                    </div>
                    <span className="ml-2 font-medium text-hookr-light">{review.userName}</span>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star 
                        key={index} 
                        className={`w-4 h-4 ${index < review.rating ? 'text-hookr-accent fill-hookr-accent' : 'text-gray-400'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-hookr-light">{review.content}</p>
                <p className="text-xs text-hookr-light text-opacity-50 mt-1">{review.date}</p>
              </div>
            ))}
            <Button 
              variant="outline"
              className="w-full mt-4 border-hookr-light border-opacity-20 text-hookr-light"
            >
              Write a Review
            </Button>
          </div>
        ) : (
          <div className="text-center py-10 text-hookr-light opacity-70">
            <p>No reviews yet</p>
            <Button className="mt-4 bg-hookr-accent text-white">Be the First to Review</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileReviews;
