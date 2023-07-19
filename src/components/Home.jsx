import filterPixelLogo from "../assets/filterPixelLogo.svg";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useUserAuth } from "../context/UserAuthContextProvider";
import { useNavigate } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useState } from "react";
import S3Content from "./S3Content";
import GoogleDriveContent from "./GoogleDriveContent";

const Home = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();
  const [tabSelected, setTabSeleced] = useState(false);

  const logOutHandler = async (e) => {
    e.preventDefault();
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen space-y-3 bg-[#1B1B1B]  ">
      <header className="flex justify-between align-middle p-4 ">
        <div className="flex gap-2 align-middle justify-center">
          <img src={filterPixelLogo} alt="" />
          <div className="my-auto text-white">FilterPixel</div>
        </div>

        <div className="flex gap-2 align-middle justify-center">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              className="!bg-transparent !text-white !my-auto"
            >
              <div>{user && <span>Hi! {user.email}</span>}</div>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={logOutHandler}>Log Out</MenuItem>
            </MenuList>
          </Menu>
          <div className="my-auto">
            <BiSolidUserCircle color="white" size={30} />
          </div>
        </div>
      </header>
      <div className="px-12 py-6">
        <div className="px-8">
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab
                className={`!rounded-t-full  !border-none ${
                  !tabSelected ? "!bg-white !text-black" : "!text-white"
                }`}
                onClick={() => setTabSeleced(false)}
              >
                S3
              </Tab>
              <Tab
                className={`!rounded-t-full !border-none ${
                  tabSelected ? "!bg-white !text-black" : "!text-white"
                }`}
                onClick={() => setTabSeleced(true)}
              >
                Google Drive
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <S3Content />
              </TabPanel>
              <TabPanel>
                <GoogleDriveContent />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Home;
