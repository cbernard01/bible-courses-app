import React from "react"
import {Avatar, Box, Flex, Link, MenuGroup, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import NextLink from "next/link";
import {useLogoutMutation, useMeQuery} from "../generated/graphql";
import {isServer} from "../utils/isServer";

const NavBar: React.FC<{}> = ({}) => {
  const [{fetching: logoutFetching}, logout]= useLogoutMutation();
  const [{data, fetching}] = useMeQuery({pause: isServer()});
  let body = null

  if (fetching) {

  } else if (!data?.me?.user) {
    body = (
      <>
        <NextLink href={"/login"}>
          <Link color={"black"} mr={2}>Login</Link>
        </NextLink>
        <NextLink href={"/register"}>
          <Link color={"black"}>register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Menu>
        <MenuButton as={Avatar} size="sm">
        </MenuButton>
        <MenuList>
          <MenuGroup title={data.me.user.username}>
            <MenuItem>Profile</MenuItem>
            <NextLink href={"/"}>
            <MenuItem onClick={()=> logout()} isLoading={{logoutFetching}}>Logout</MenuItem>
            </NextLink>
          </MenuGroup>
        </MenuList>
      </Menu>
    )
  }

  return (
    <Flex bg={"blue.600"} p={4}>
      <Box ml={"auto"}>
        {body}
      </Box>
    </Flex>
  );
}

export default NavBar;
