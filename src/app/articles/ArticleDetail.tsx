import React from "react";
import Image from "next/image";

interface ArticleDetailProps {
  title?: string;
  description?: string;
  image?: string;
}

const ArticleDetail = ({ title, description, image }: ArticleDetailProps) => {
  return (
    <div className="px-5 py-6 rounded-md flex flex-col bg-white">
      <div className="">
        {image && (
          <Image
            src={image}
            alt="Picture of the article"
            width={100}
            height={100}
          />
        )}
      </div>

      <h1 className=" text-lg font-bold py-1">Lorem Ipsum</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores eaque
        voluptate praesentium quis nobis doloremque. Eos, quidem? Officia at
        earum eveniet labore eaque repudiandae excepturi! Quis velit architecto
        deleniti atque?
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores eaque
        voluptate praesentium quis nobis doloremque. Eos, quidem? Officia at
        earum eveniet labore eaque repudiandae excepturi! Quis velit architecto
        deleniti atque?
      </p>
    </div>
  );
};

export default ArticleDetail;
