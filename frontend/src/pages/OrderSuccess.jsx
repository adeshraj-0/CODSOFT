import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import { useEffect } from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";
import "../styles/OrderSuccess.css";

function OrderSuccess({ user, setCartItems }) {

  const { state } = useLocation();
  useEffect(() => {
  setCartItems([]);

  localStorage.removeItem("cartItems");
}, [setCartItems]);
  const isLoggedIn =
  localStorage.getItem("isLoggedIn") === "true";

if (!isLoggedIn) {
  return <Navigate to="/login" replace />;
}

if (!state) {
  return <Navigate to="/" replace />;
}

const orderId =
  state.orderId || "ORD-NOT-AVAILABLE";

const invoiceNo =
  state.invoiceNo || "INV-NOT-AVAILABLE";

  const delivery = new Date();

  delivery.setDate(
    delivery.getDate() + 3
  );

  const customer =
    state.customer || {};

  const payment =
    state.payment || "COD";

  const cartItems =
    state.cartItems || [];

  const subtotal =
    Number(state.subtotal) || 0;

  const discount =
    Number(state.discount) || 0;

  const shipping =
    Number(state.shipping) || 0;

  const total =
    Number(state.total) || 0;

  const orderDate =
    state.orderDate ||
    new Date().toLocaleDateString("en-IN");

  const downloadInvoice = () => {

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pageWidth =
      pdf.internal.pageSize.getWidth();

    const pageHeight =
      pdf.internal.pageSize.getHeight();

    const margin = 12;

    const contentWidth =
      pageWidth - margin * 2;

    let y = 18;

    const COLORS = {
      primary: [37, 99, 235],
      dark: [35, 35, 35],
      gray: [120, 120, 120],
      border: [225, 225, 225],
      light: [248, 249, 251],
      green: [34, 197, 94],
      red: [239, 68, 68],
      white: [255, 255, 255],
    };

    const money = (amount = 0) =>
      "Rs. " +
      Number(amount).toLocaleString(
        "en-IN"
      );

const formatDate = (date) =>
  new Date(date).toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  );
    function numberToWords(num) {

      if (num === 0)
        return "Zero Only";

      const ones = [
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
      ];

      const tens = [
        "",
        "",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
      ];
            const convert = (n) => {

        if (n < 20)
          return ones[n];

        if (n < 100)
          return (
            tens[Math.floor(n / 10)] +
            (n % 10
              ? " " + ones[n % 10]
              : "")
          );

        if (n < 1000)
          return (
            ones[Math.floor(n / 100)] +
            " Hundred " +
            convert(n % 100)
          );

        if (n < 100000)
          return (
            convert(
              Math.floor(n / 1000)
            ) +
            " Thousand " +
            convert(n % 1000)
          );

        if (n < 10000000)
          return (
            convert(
              Math.floor(n / 100000)
            ) +
            " Lakh " +
            convert(n % 100000)
          );

        return (
          convert(
            Math.floor(
              n / 10000000
            )
          ) +
          " Crore " +
          convert(
            n % 10000000
          )
        );
      };

      return (
        convert(num)
          .replace(/\s+/g, " ")
          .trim() + " Only"
      );
    }

    const drawHeader = () => {

      pdf.setFillColor(
        ...COLORS.primary
      );

      pdf.rect(
        0,
        0,
        pageWidth,
        28,
        "F"
      );

      pdf.setTextColor(
        ...COLORS.white
      );

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(23);

      pdf.text(
        "ORIGIN STORE",
        margin,
        18
      );

      pdf.setTextColor(
        ...COLORS.dark
      );

      pdf.setFontSize(16);

      pdf.text(
        "TAX INVOICE",
        margin,
        40
      );

      y = 48;
    };

    const drawFooter = () => {

      const footerY =
        pageHeight - 15;

      pdf.setDrawColor(
        ...COLORS.border
      );

      pdf.line(
        margin,
        footerY - 5,
        pageWidth - margin,
        footerY - 5
      );

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(9);

      pdf.text(
        "Customer Support",
        margin,
        footerY
      );

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.text(
        "support@originstore.com",
        margin,
        footerY + 5
      );

      pdf.text(
        "www.originstore.com",
        pageWidth - margin,
        footerY + 5,
        {
          align: "right",
        }
      );

      pdf.setFontSize(8);

      pdf.text(
        `Page ${
          pdf.getCurrentPageInfo()
            .pageNumber
        }`,
        pageWidth / 2,
        footerY + 5,
        {
          align: "center",
        }
      );
    };

    const ensureSpace = (
      height = 20
    ) => {

      if (
        y + height >
        pageHeight - 25
      ) {

        drawFooter();

        pdf.addPage();

        drawHeader();
        y = 48;
      }
    };

    drawHeader();
        // =====================================
    // SELLER DETAILS
    // =====================================

    pdf.setFillColor(...COLORS.light);

    pdf.roundedRect(
      margin,
      y,
      88,
      50,
      3,
      3,
      "F"
    );

    pdf.setDrawColor(...COLORS.border);

    pdf.roundedRect(
      margin,
      y,
      88,
      50,
      3,
      3
    );

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);

    pdf.text(
      "Seller Details",
      margin + 5,
      y + 8
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    pdf.text(
      "Origin Store Pvt. Ltd.",
      margin + 5,
      y + 16
    );

    pdf.text(
      "Bengaluru, Karnataka",
      margin + 5,
      y + 22
    );

    pdf.text(
      "GSTIN : 29ABCDE1234F1Z5",
      margin + 5,
      y + 28
    );

    pdf.text(
      "Phone : +91 9876543210",
      margin + 5,
      y + 34
    );

    pdf.text(
      "support@originstore.com",
      margin + 5,
      y + 40
    );

    pdf.text(
      "www.originstore.com",
      margin + 5,
      y + 46
    );

    // =====================================
    // INVOICE DETAILS
    // =====================================

    pdf.setFillColor(...COLORS.light);

    pdf.roundedRect(
      110,
      y,
      88,
      50,
      3,
      3,
      "F"
    );

    pdf.setDrawColor(...COLORS.border);

    pdf.roundedRect(
      110,
      y,
      88,
      50,
      3,
      3
    );

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);

    pdf.text(
      "Invoice Details",
      115,
      y + 8
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    pdf.text(
      `Invoice No : ${invoiceNo}`,
      115,
      y + 16
    );

    pdf.text(
      `Order ID : ${orderId}`,
      115,
      y + 22
    );

    pdf.text(
      `Order Date : ${formatDate(orderDate)}`,
      115,
      y + 28
    );

    pdf.text(
      `Payment : ${payment}`,
      115,
      y + 34
    );

    pdf.text(
      `Delivery : ${delivery.toDateString()}`,
      115,
      y + 40
    );

    pdf.text(
      "Status : Paid",
      115,
      y + 46
    );

    y += 62;

    ensureSpace(75);

    // =====================================
    // CUSTOMER DETAILS
    // =====================================

    const customerAddress =
      pdf.splitTextToSize(
        `${customer.address}
${customer.city}, ${customer.state}
PIN - ${customer.pincode}`,
        76
      );

    const customerHeight =
      Math.max(
        55,
        customerAddress.length * 5 + 35
      );

    pdf.setFillColor(...COLORS.light);

    pdf.roundedRect(
      margin,
      y,
      88,
      customerHeight,
      3,
      3,
      "F"
    );

    pdf.setDrawColor(...COLORS.border);

    pdf.roundedRect(
      margin,
      y,
      88,
      customerHeight,
      3,
      3
    );

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);

    pdf.text(
      "Customer Details",
      margin + 5,
      y + 8
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    let customerY = y + 16;

    pdf.text(
      customer.name || "",
      margin + 5,
      customerY
    );

    customerY += 6;

    pdf.text(
      customer.phone || "",
      margin + 5,
      customerY
    );

    customerY += 6;

    pdf.text(
      customer.email || "",
      margin + 5,
      customerY
    );

    customerY += 8;

    pdf.text(
      customerAddress,
      margin + 5,
      customerY
    );
        // =====================================
    // SHIPPING DETAILS
    // =====================================

    const shippingAddress =
      pdf.splitTextToSize(
        `${customer.address}
${customer.city}, ${customer.state}
PIN - ${customer.pincode}`,
        76
      );

    const shippingHeight =
      Math.max(
        55,
        shippingAddress.length * 5 + 35
      );

    pdf.setFillColor(...COLORS.light);

    pdf.roundedRect(
      110,
      y,
      88,
      shippingHeight,
      3,
      3,
      "F"
    );

    pdf.setDrawColor(...COLORS.border);

    pdf.roundedRect(
      110,
      y,
      88,
      shippingHeight,
      3,
      3
    );

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);

    pdf.text(
      "Shipping Address",
      115,
      y + 8
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    let shipY = y + 16;

    pdf.text(
      customer.name || "",
      115,
      shipY
    );

    shipY += 6;

    pdf.text(
      customer.phone || "",
      115,
      shipY
    );

    shipY += 6;

    pdf.text(
      customer.email || "",
      115,
      shipY
    );

    shipY += 8;

    pdf.text(
      shippingAddress,
      115,
      shipY
    );

    y +=
      Math.max(
        customerHeight,
        shippingHeight
      ) + 15;

    ensureSpace(45);

    // =====================================
    // PRODUCTS TABLE
    // =====================================

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(13);

    pdf.setTextColor(
      ...COLORS.primary
    );

    pdf.text(
      "Products",
      margin,
      y
    );

    y += 6;

    autoTable(pdf, {
      startY: y,

      theme: "grid",

      margin: {
        left: margin,
        right: margin,
      },

      head: [[
        "#",
        "Product",
        "Qty",
        "Price",
        "Total"
      ]],

      body: cartItems.map(
        (item, index) => {
const rawPrice =
  item.price ??
  item.discountPrice ??
  item.finalPrice ??
  item.productPrice ??
  0;

const price = Number(
  String(rawPrice)
    .replace("₹", "")
    .replace(/,/g, "")
    .trim()
);

const qty = Number(item.quantity ?? 1);
         
          return [
            index + 1,
            item.name ||
            item.title ||
            "Product",
            qty,
            money(price),
            money(price * qty),
          ];

        }
      ),

      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: 4,
        overflow: "linebreak",
        valign: "middle",
      },

      headStyles: {
        fillColor:
          COLORS.primary,
        textColor: 255,
        fontStyle: "bold",
        halign: "center",
      },

      alternateRowStyles: {
        fillColor: [
          248,
          249,
          251,
        ],
      },

      columnStyles: {
        0: {
          cellWidth: 12,
          halign: "center",
        },

        1: {
          cellWidth: 88,
        },

        2: {
          cellWidth: 18,
          halign: "center",
        },

        3: {
          cellWidth: 32,
          halign: "right",
        },

        4: {
          cellWidth: 36,
          halign: "right",
        },
      },

didDrawPage: (data) => {

  if (data.pageNumber > 1) {

    pdf.setFillColor(...COLORS.primary);

    pdf.rect(
      0,
      0,
      pageWidth,
      28,
      "F"
    );

    pdf.setTextColor(255);

    pdf.setFont("helvetica", "bold");

    pdf.setFontSize(23);

    pdf.text(
      "ORIGIN STORE",
      margin,
      18
    );

    pdf.setTextColor(...COLORS.dark);

    pdf.setFontSize(16);

    pdf.text(
      "TAX INVOICE",
      margin,
      40
    );
  }



},
    });

    y =
      pdf.lastAutoTable.finalY +
      12;
          // =====================================
    // ORDER SUMMARY
    // =====================================


    pdf.setFillColor(...COLORS.light);

    pdf.roundedRect(
      108,
      y,
      90,
      60,
      3,
      3,
      "F"
    );

    pdf.setDrawColor(...COLORS.border);

    pdf.roundedRect(
      108,
      y,
      90,
      60,
      3,
      3
    );

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);

    pdf.setTextColor(...COLORS.primary);

    pdf.text(
      "Order Summary",
      113,
      y + 8
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    pdf.setTextColor(...COLORS.dark);

    pdf.text(
      "Subtotal",
      113,
      y + 18
    );

    pdf.text(
      money(subtotal),
      193,
      y + 18,
      {
        align: "right",
      }
    );

    pdf.text(
      "Discount",
      113,
      y + 26
    );

    pdf.setTextColor(...COLORS.green);

    pdf.text(
      "- " + money(discount),
      193,
      y + 26,
      {
        align: "right",
      }
    );

    pdf.setTextColor(...COLORS.dark);

    pdf.text(
      "Shipping",
      113,
      y + 34
    );

    pdf.text(
      shipping === 0
        ? "FREE"
        : money(shipping),
      193,
      y + 34,
      {
        align: "right",
      }
    );

    pdf.setDrawColor(...COLORS.border);

    pdf.line(
      113,
      y + 39,
      193,
      y + 39
    );

    pdf.setFillColor(...COLORS.primary);

    pdf.roundedRect(
      112,
      y + 43,
      80,
      11,
      2,
      2,
      "F"
    );

    pdf.setTextColor(255);

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(13);

    pdf.text(
      "Grand Total",
      116,
      y + 50
    );

    pdf.text(
      money(total),
      190,
      y + 50,
      {
        align: "right",
      }
    );

    y += 85;


// =====================================
// AMOUNT IN WORDS
// =====================================

pdf.setTextColor(...COLORS.primary);

pdf.setFont("helvetica", "bold");

pdf.setFontSize(12);

pdf.text(
  "Amount in Words",
  margin,
  y
);

y += 8;

const words = pdf.splitTextToSize(
  "Indian Rupees " + numberToWords(total),
  contentWidth - 10
);

const boxHeight = Math.max(
  18,
  words.length * 6 + 8
);

pdf.setFillColor(250, 250, 250);

pdf.roundedRect(
  margin,
  y,
  contentWidth,
  boxHeight,
  2,
  2,
  "F"
);

pdf.setDrawColor(...COLORS.border);

pdf.roundedRect(
  margin,
  y,
  contentWidth,
  boxHeight,
  2,
  2
);

pdf.setTextColor(...COLORS.dark);

pdf.setFont("helvetica", "italic");

pdf.setFontSize(10);

pdf.text(
  words,
  margin + 5,
  y + 8
);

y += boxHeight + 12;

    // =====================================
    // PAYMENT DETAILS
    // =====================================


    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(12);

    pdf.setTextColor(...COLORS.primary);

    pdf.text(
      "Payment Details",
      margin,
      y
    );

    y += 8;

    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setFontSize(10);

    pdf.setTextColor(...COLORS.dark);

    pdf.text(
      `Payment Method : ${payment}`,
      margin,
      y
    );

    y += 6;

    pdf.setTextColor(...COLORS.green);

    pdf.text(
      "Payment Status : SUCCESS",
      margin,
      y
    );

    y += 15;
        // =====================================
    // QR & VERIFICATION
    // =====================================


    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(...COLORS.primary);

    pdf.text(
      "Invoice Verification",
      margin,
      y
    );

    y += 8;

    pdf.setDrawColor(...COLORS.border);

    pdf.rect(
      margin,
      y,
      30,
      30
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);

    pdf.setTextColor(...COLORS.gray);

    pdf.text(
      "QR CODE",
      margin + 7,
      y + 16
    );

    pdf.setFontSize(10);
    pdf.setTextColor(...COLORS.dark);

    pdf.text(
      "Scan to verify this invoice",
      margin + 38,
      y + 10
    );

    pdf.text(
      `Invoice : ${invoiceNo}`,
      margin + 38,
      y + 18
    );

    pdf.text(
      `Order : ${orderId}`,
      margin + 38,
      y + 26
    );

    y += 42;

    // =====================================
    // TERMS
    // =====================================


    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(...COLORS.primary);

    pdf.text(
      "Terms & Conditions",
      margin,
      y
    );

    y += 8;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(...COLORS.dark);

    const terms = [
      "• This is a computer generated invoice.",
      "• Products are covered under Origin Store return policy.",
      "• Preserve this invoice for warranty.",
      "• Refunds are credited to the original payment method.",
      "• Contact support@originstore.com for any help."
    ];

    pdf.text(
      terms,
      margin,
      y
    );

    // =====================================
    // SIGNATURE
    // =====================================

y += 20;

pdf.setDrawColor(180);

pdf.line(
  135,
  y,
  190,
  y
);

pdf.setFont("helvetica","bold");
pdf.setFontSize(10);

pdf.text(
  "Authorized Signature",
  145,
  y + 6
);

y += 15;

    drawFooter();

    pdf.save(`${invoiceNo}.pdf`);

  };

  return (
    <section className="success-page">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>
          Order Placed Successfully!
        </h1>

        <p>
          Thank you for shopping with
          Origin Store.
        </p>

        <div className="order-info">

          <p>
            <strong>Order ID :</strong>{" "}
            {orderId}
          </p>

          <p>
            <strong>Invoice :</strong>{" "}
            {invoiceNo}
          </p>

          <p>
            <strong>Order Date :</strong>{" "}
            {orderDate}
          </p>

          <p>
            <strong>Expected Delivery :</strong>{" "}
            {delivery.toDateString()}
          </p>

          <p>
            <strong>Total :</strong>{" "}
            Rs. {Number(total).toLocaleString("en-IN")}
          </p>

        </div>

        <div className="success-buttons">

          <button
            className="invoice-btn"
            onClick={downloadInvoice}
          >
            📄 Download Invoice
          </button>

          <Link to="/">
            <button className="home-btn">
              🏠 Continue Shopping
            </button>
          </Link>

        </div>

      </div>

    </section>
  );

}

export default OrderSuccess;