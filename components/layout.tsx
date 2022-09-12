/* eslint-disable react/jsx-no-comment-textnodes */
import { Children, ReactNode } from "react";
import Footer from "./footer";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuItemOption,
  MenuOptionGroup,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

import Logo from "./icons/logo";
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import CartIcon from "./icons/carticon";
import Head from "next/head";
const Links = ["Dashboard", "Projects", "Team"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Layout({ children }: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>RaiseYourFashion</title>
        <meta
          name="description"
          content="buy products at lowest as it possible"
        />
      </Head>
      {/* // eslint-disable-next-line react-hooks/rules-of-hooks */}
      <Box overflow='scroll'>
      <Box bg="blue.500" px={4} width="100%">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box width="1em" mr="2em">
              <Link href="/">
                <a>
                  <Logo/>
                </a>
              </Link>
            </Box>
          </HStack>
          <InputGroup width="40%" bg="white">
            <InputRightElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<SearchIcon color="black" />}
            />
            <Input
              variant="outline"
              focusBorderColor="none"
              size="md"
              placeholder={``}
            />
          </InputGroup>

          <Button
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </Button>

          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={Button}
                  isActive={isOpen}
                  rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                >
                  More
                </MenuButton>
                <MenuList>
                  <MenuGroup title="Profile">
                    <MenuItem>My Account</MenuItem>
                    <MenuItem>Payments </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="Help">
                    <MenuItem>Docs</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                  </MenuGroup>
                </MenuList>
              </>
            )}
          </Menu>

          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={Button}
                  isActive={isOpen}
                  leftIcon={<FiShoppingCart />}
                  //   variant='link'
                  //   color='white'
                >
                  Cart
                </MenuButton>
                <MenuList>
                  <MenuGroup title="Profile">
                    <MenuItem>My Account</MenuItem>
                    <MenuItem>Payments </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="Help">
                    <MenuItem>Docs</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                  </MenuGroup>
                </MenuList>
              </>
            )}
          </Menu>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuGroup title="Profile">
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Help">
                  <MenuItem>Docs</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
        
      </Box>
      <Box
      overflowY={'scroll'}
      >{children}</Box>
      <Footer />
      </Box>
    </>
  );
}
