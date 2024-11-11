import moment from "moment";
import { customToast } from "../components/common/Toast";

export const CapitalizeFirstLetter = (str) => {
  let newStr = "";
  if (str?.length && typeof str === "string") {
    newStr = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return newStr;
};

export async function fetchImageAsBinary(url) {
  try {
    // Fetch the image
    const response = await fetch(url);
    // Check if the fetch was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    // Convert the image response to a Blob
    const blob = await response.blob();
    // Convert the Blob to an ArrayBuffer (binary data)
    const arrayBuffer = await blob.arrayBuffer();
    // Convert ArrayBuffer to a typed array (Uint8Array) for binary representation
    const binaryData = new Uint8Array(arrayBuffer);
    return binaryData;
  } catch (error) {
    customToast.error("Error fetching and converting image:", error);
  }
}

export const calculatePayment = (presentRate = 0) => {
  const feePercentage = 0.035;
  const fixedFee = 0.3;

  // Calculate amount to receive
  const amountToReceive = +presentRate;
  // Calculate total amount based on hourly rate
  const totalAmount = (amountToReceive + fixedFee) / (1 - feePercentage);

  return {
    amountToReceivee: amountToReceive?.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
  };
};
