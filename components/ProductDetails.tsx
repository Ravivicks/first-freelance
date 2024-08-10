import { IProduct } from "@/types";
import React from "react";

interface IProps {
  product: IProduct;
}

const ProductDetails = ({ product }: IProps) => {
  return (
    <div className="m-10">
      {product?.productInformationTech?.length > 1 && (
        <div>
          <div className="flex gap-5 md:flex-row flex-col justify-between">
            <div className="md:w-1/2 h-fit">
              <p className="text-xl font-semibold mb-5">Technical Details</p>
              <table>
                {product?.productInformationTech?.map((item, index) => (
                  <tr key={index}>
                    <th className="bg-gray-100 border p-2 font-medium text-left pl-5">
                      {item.name}
                    </th>
                    <td className="border p-2 font-normal text-left pl-5">
                      {item.value}
                    </td>
                  </tr>
                ))}
              </table>
            </div>
            {product?.productInformationAdditional?.length > 1 && (
              <div className="md:w-1/2 h-fit">
                <p className="text-xl font-semibold mb-5">Additional Details</p>
                <table>
                  {product?.productInformationAdditional.map(
                    (item, index) =>
                      item.name !== "Customer Reviews" && (
                        <tr key={index}>
                          <th className="bg-gray-100 border p-2 font-medium text-left pl-5">
                            {item.name}
                          </th>
                          <td className="border p-2 font-normal text-left pl-5">
                            {item.value}
                          </td>
                        </tr>
                      )
                  )}
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
