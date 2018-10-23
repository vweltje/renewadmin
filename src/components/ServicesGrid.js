import React from "react";
import { Link } from "gatsby";

import "./ServicesGrid.css";

export default class Grid extends React.Component {
  state = {
    hover: false
  };

  getIconSrc(slug) {
    let icon;
    if (slug.includes("account-payable")) icon = "payable";
    else if (slug.includes("accounts-receivable")) icon = "receive";
    else if (slug.includes("bas")) icon = "bas";
    else if (slug.includes("month-end")) icon = "month";
    else if (slug.includes("payg")) icon = "pay";
    else if (slug.includes("payroll")) icon = "payroll";
    else if (slug.includes("reconciliations")) icon = "reconciliantion";
    else if (slug.includes("superannuation")) icon = "super";
    else if (slug.includes("work-flow-efficiency")) icon = "flow";
    return icon;
  }

  render() {
    const services = this.props.services;
    const showDescription = this.props.showDescription;
    return (
      <div className="ServicesGrid">
        {services.map((service, index) => {
          return (
            <div
              className="ServicesGrid--service"
              key={service.title + " " + index}
            >
              <div
                className={
                  "ServicesGrid--Icon " + this.getIconSrc(service.slug)
                }
              />
              <h3>{service.title}</h3>
              {(() => {
                if (showDescription) {
                  return <p>{service.description}</p>;
                } else {
                  return (
                    <Link to={service.slug} className="Button Secondary">
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
  }
}

// export default ({ content, services = {}, showDescription = false }) => {
//   let activeElem = false;
//   const activateElem = key => {
//     activeElem = key;
//     console.log(key);
//   };
//   const deactivateElem = () => {
//     activeElem = false;
//   };
//
//   return (
{
  /* <div className="ServicesGrid">
  {services.map((service, index) => {
    const key = service.title + " " + index;
    return (
      <div
        className="ServicesGrid--service"
        key={key}
        onClick={activateElem(key)}
        onMouseLeave={deactivateElem()}
      >
        <div className={"ServicesGrid--Icon " + getIconSrc(service.slug)} />
        <h3>{service.title}</h3>
        {(() => {
          if (showDescription) {
            return <p>{service.description}</p>;
          } else {
            const btnType = activeElem === key ? "" : "Secondary";
            console.log(btnType);
            return (
              <Link to={service.slug} className={"Button " + { btnType }}>
                know more
              </Link>
            );
          }
        })()}
      </div>
    );
  })}
</div>;
//   ); */
}
// };
