import { ImageList } from "@mui/material";
import ProgressItem from "./ProgressItem";

const ProgressList = ({ files }) => {
  return (
    <div className="progress-list">
      <ImageList rowHeight={250}
        sx={{
          '&.MuiImageList-root': {
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))!important",
          },
        }}
      >
        {files.map((file, index) => (
          <ProgressItem key={index} file={file} />
        ))}
      </ImageList>
    </div>
  );
};

export default ProgressList;