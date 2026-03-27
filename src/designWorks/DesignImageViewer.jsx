import { useParams } from "react-router-dom";

import img1 from "../assets/DesignDetailPage1.jpg";
import img2 from "../assets/DesignDetailPage2.jpg";
import img3 from "../assets/DesignDetailPage3.jpg";
import img4 from "../assets/DesignDetailPage4.jpg";

const images = {
  1: img1,
  2: img2,
  3: img3,
  4: img4
};

export default function DesignImageViewer() {
  const { id } = useParams();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px 20px",
        background: "#0f172a",
        minHeight: "100vh"
      }}
    >
      <img
        src={images[id]}
        alt="design"
        style={{
          width: "468px",
          height: "auto",
          maxWidth: "100%"
        }}
      />
    </div>
  );
}