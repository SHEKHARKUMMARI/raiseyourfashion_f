import React, { CSSProperties } from "react";
export type TablePlaceHolderProps = {
  totalColumns?: number;
  headerStyles?: CSSProperties;
  columnStyles?: CSSProperties;
};
function TablePlaceHolder(props: TablePlaceHolderProps) {
  const { totalColumns = 10, headerStyles = {}, columnStyles = {} } = props;
  const allColumns = Array(totalColumns).fill(0);
  const width = headerStyles.width || "100%";
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div id="line" className="shine" style={{ ...headerStyles }} />
      {allColumns?.map(() => {
        return <div id="line" className="shine" style={{ ...columnStyles }} />;
      })}
      <style jsx>
        {`
          .shine {
            background: #f6f7f8;
            background-image: linear-gradient(
              to right,
              #f6f7f8 0%,
              #edeef1 20%,
              #f6f7f8 40%,
              #edeef1 60%,
              #f6f7f8 80%,
              #edeef1 100%
            );
            background-repeat: no-repeat;
            background-size: 800px 104px;
            display: inline-block;
            position: relative;

            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -webkit-animation-fill-mode: forwards;
            animation-fill-mode: forwards;
            -webkit-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
            -webkit-animation-name: placeholderShimmer;
            animation-name: placeholderShimmer;
            -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
          }

          #line {
            height: 10px;
            margin-top: 10px;
            width: 100%;
          }

          @-webkit-keyframes placeholderShimmer {
            0% {
              background-position: -468px 0;
            }

            100% {
              background-position: 468px 0;
            }
          }

          @keyframes placeholderShimmer {
            0% {
              background-position: -468px 0;
            }

            100% {
              background-position: 468px 0;
            }
          }
        `}
      </style>
    </div>
  );
}

export default TablePlaceHolder;
