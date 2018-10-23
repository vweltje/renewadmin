import React from "react";
import Image from "../components/Image";
import { Link } from "gatsby";

import "./ServicesGrid.css";

export default ({ content, showDescription = false }) => {
  const services = [
    {
      title: "title",
      description:
        "Emily Irish, Charles Coathup and James Coathup met while working at Renew Solutions. We found that our individual fields complemented each other’s in surprising, and what turned out to be inseparable, ways.",
      slug: "#",
      icon: "https://ucarecdn.com/d2656287-b128-412f-bb1b-5a24df0c60a6/"
    },
    {
      title: "title",
      description:
        "Emily Irish, Charles Coathup and James Coathup met while working at Renew Solutions. We found that our individual fields complemented each other’s in surprising, and what turned out to be inseparable, ways.",
      slug: "#",
      icon: "https://ucarecdn.com/d2656287-b128-412f-bb1b-5a24df0c60a6/"
    },
    {
      title: "title",
      description:
        "Emily Irish, Charles Coathup and James Coathup met while working at Renew Solutions. We found that our individual fields complemented each other’s in surprising, and what turned out to be inseparable, ways.",
      slug: "#",
      icon: "https://ucarecdn.com/d2656287-b128-412f-bb1b-5a24df0c60a6/"
    },
    {
      title: "title",
      description:
        "Emily Irish, Charles Coathup and James Coathup met while working at Renew Solutions. We found that our individual fields complemented each other’s in surprising, and what turned out to be inseparable, ways.",
      slug: "#",
      icon: "https://ucarecdn.com/d2656287-b128-412f-bb1b-5a24df0c60a6/"
    },
    {
      title: "title",
      description:
        "Emily Irish, Charles Coathup and James Coathup met while working at Renew Solutions. We found that our individual fields complemented each other’s in surprising, and what turned out to be inseparable, ways.",
      slug: "#",
      icon: "https://ucarecdn.com/d2656287-b128-412f-bb1b-5a24df0c60a6/"
    },
    {
      title: "title",
      description:
        "Emily Irish, Charles Coathup and James Coathup met while working at Renew Solutions. We found that our individual fields complemented each other’s in surprising, and what turned out to be inseparable, ways.",
      slug: "#",
      icon: "https://ucarecdn.com/d2656287-b128-412f-bb1b-5a24df0c60a6/"
    }
  ];
  return (
    <div className="ServicesGrid">
      {services.map((service, index) => {
        return (
          <div
            className="ServicesGrid--service"
            key={service.title + " " + index}
          >
            <Image src={service.icon} alt="icon" />
            <h3>{service.title}</h3>
            {(() => {
              if (showDescription) {
                return <p>{service.description}</p>;
              } else {
                return (
                  <Link to={service.slug} className="button">
                    know more
                  </Link>
                );
              }
            })()}
          </div>
        );
      })}
    </div>
  );
};
