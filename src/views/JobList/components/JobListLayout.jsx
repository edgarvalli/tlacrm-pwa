import React from "react";
import { Typography } from "@material-ui/core";

const ListView = ({ items = [], renderItem }) => items.map(renderItem);
const parseDate = date => {
  const d = date.split("T");
  const _date = d[0].split("-");
  const _time = d[1].split(".")[0];
  return `${_date[2]}/${_date[1]}/${_date[0]} ${_time}`;
};
class JobListLayout extends React.Component {
  state = {
    jobs: [
      {
        _id: "as1211s1vbf",
        clientName: "Edgar Valli",
        createDate: new Date(),
        updateDate: new Date(),
        acceptTax: false,
        paymentsTotal: 700,
        subtotal: 12700,
        tax: 0,
        total: 12700,
        rest: 12000,
        payments: [
          {
            createDate: new Date(),
            value: 500
          },
          {
            createDate: new Date(),
            value: 200
          }
        ],
        movements: [
          {
            productId: "a12swe1d21",
            productName: "Servicio de tapizado de sillas",
            quantity: 6,
            price: 450
          },
          {
            productId: "a12swe1d22",
            productName: "Servicio de tapizado de sala",
            quantity: 1,
            price: 10000
          }
        ]
      },
      {
        _id: "as1211s1vbf1",
        clientName: "Gabrila Ovalle",
        createDate: new Date(),
        updateDate: new Date(),
        acceptTax: false,
        paymentsTotal: 700,
        subtotal: 12700,
        tax: 0,
        total: 12700,
        rest: 12000,
        payments: [
          {
            createDate: new Date(),
            value: 500
          },
          {
            createDate: new Date(),
            value: 200
          }
        ],
        movements: [
          {
            productId: "a12swe1d21",
            productName: "Servicio de tapizado de sillas",
            quantity: 6,
            price: 450
          },
          {
            productId: "a12swe1d22",
            productName: "Servicio de tapizado de sala",
            quantity: 1,
            price: 10000
          }
        ]
      }
    ]
  };

  renderJob = item => (
    <div key={item._id} className="ev-card border-bottom-grey">
      <div className="ev-card-row__2">
        <span>
          <div>
            <Typography>{item.clientName}</Typography>
          </div>
          <div>
            <span className="font-size-small">
              {parseDate(item.createDate.toISOString())}
            </span>
          </div>
        </span>
        <span>
          <div className="ev-card-row__2">
            <span className="justify-end italic font-size-small">Total</span>
            <span className="font-size-small">
              $
              {item.total.toLocaleString("es-MX", {
                maximumFractionDigits: 2
              })}
            </span>
          </div>
          <div className="ev-card-row__2">
            <span className="justify-end italic font-size-small">Anticipo</span>
            <span className="font-size-small">
              $
              {item.paymentsTotal.toLocaleString("es-MX", {
                maximumFractionDigits: 2
              })}
            </span>
          </div>
          <div className="ev-card-row__2">
            <span className="justify-end italic font-size-small">Resta</span>
            <span className="font-size-small">
              $
              {item.rest.toLocaleString("es-MX", {
                maximumFractionDigits: 2
              })}
            </span>
          </div>
        </span>
      </div>
    </div>
  );

  render() {
    return (
      <div className="ev-container">
        <ListView items={this.state.jobs} renderItem={this.renderJob} />
      </div>
    );
  }
}

export default JobListLayout;
