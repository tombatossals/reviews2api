import React from "react";
import { Review as ReviewType } from "../../types";
import dayjs from "dayjs";

const relativeTime = require("dayjs/plugin/relativeTime");
const localeData = require("dayjs/plugin/localeData");
const es = require("dayjs/locale/es");
dayjs.extend(relativeTime);
dayjs.extend(localeData);
dayjs.locale(es);

const Review = ({ review }: { review: ReviewType }) => {
  return (
    <div className="mb-4 mx-4 flex items-center justify-center">
      <div className="bg-white flex-1 rounded-2xl px-10 py-4 shadow-lg hover:shadow-2xl transition duration-500">
        <div className="mt-4">
          <h1 className="text-lg text-gray-700 font-semibold">
            {review.title_es}
          </h1>
          <div className="flex mt-2">
            {Array(parseFloat(review.stars))
              .fill(0)
              .map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
          </div>
          <p className="mt-4 text-md text-gray-600 flex-1">
            {review.review_es}
          </p>
          <div className="flex justify-between items-center">
            <div className="mt-4 flex items-center space-x-4 py-6">
              <div className="text-sm font-semibold">
                {review.name} •{" "}
                <span className="font-normal">
                  {dayjs(review.date).format("D [de] MMMM [de] YYYY, h:mm A")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
