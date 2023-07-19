import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const S3Content = () => {
  const toast = useToast();

  const [s3ImagesLinks, setS3ImagesLinks] = useState([]);
  useEffect(() => {
    const fetchFilesFromDrive = async () => {
      try {
        const data = await axios.get(`${import.meta.env.VITE_APP_URL}/s3`);
        console.log("data is ", data.data);
        setS3ImagesLinks(data.data);
      } catch (error) {
        toast({
          title: "Failed",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
    };
    fetchFilesFromDrive();
  }, []);

  console.log(s3ImagesLinks);
  return (
    <div className="flex flex-wrap align-middle justify-between gap-4 mx-auto">
      {s3ImagesLinks?.map((img) => {
        return (
          <div className="border-4 border-gray-400  rounded-2xl" key={img}>
            <img
              src={img}
              alt=""
              loading="lazy"
              className="border-4 border-gray-400  rounded-xl h-[300px]  aspect-square"
            />
          </div>
        );
      })}
    </div>
  );
};

export default S3Content;
