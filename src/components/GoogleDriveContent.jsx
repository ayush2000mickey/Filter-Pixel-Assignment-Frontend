import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const GoogleDriveContent = () => {
  const toast = useToast();

  const [driveImagesLinks, setDriveImagesLinks] = useState([]);
  useEffect(() => {
    const fetchFilesFromDrive = async () => {
      try {
        const data = await axios.get(`${import.meta.env.VITE_APP_URL}/drive`);
        console.log("data is ", data.data.data);
        setDriveImagesLinks(data.data.data);
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

  console.log(driveImagesLinks);
  return (
    <div className="flex flex-wrap align-middle justify-between gap-4 mx-auto">
      {driveImagesLinks?.map((img) => {
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

export default GoogleDriveContent;
