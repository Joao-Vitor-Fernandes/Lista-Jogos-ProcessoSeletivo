import { Button, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";

import logo from "../../../public/logo.png";

export function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <HStack
            as="nav"
            pt="2"
            pb="2"
            pl="4"
            pr="12"
            bg="gray.800"
            justifyContent="space-between"
        >
            <HStack as="section">
                <Link href={"/"}>
                    <Image
                        className="logo"
                        src={logo}
                        alt="Logo"
                        width="100"
                        height="100"
                    />
                </Link>
                <Link href={"/"}>
                    <Text
                        as="p"
                        fontSize={["24px", "28px", "32px", "32px", "32px"]}
                        fontWeight="700"
                        color="#316be2"
                        lineHeight="1"
                    >
                        App Masters Gaming
                    </Text>
                </Link>
            </HStack>

            <Flex
                as="section"
                display={["none", "none", "flex", "flex", "flex"]}
            >
                <Link href={"/"}>
                    <Text
                        as="p"
                        fontSize="28px"
                        fontWeight="500"
                        color="#316be2"
                        position="relative"
                        transition="color .3s ease-in-out, box-shadow .3s ease-in-out"
                        _hover={{
                            color: "white",
                            boxShadow: "inset 0 -4px 0 white",
                        }}
                    >
                        Lista de Jogos
                    </Text>
                </Link>
            </Flex>

            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    display={["flex", "flex", "none", "none", "none"]}
                    bg="transparent"
                    variant="outline"
                    color="white"
                    borderColor="transparent"
                    _hover={{ borderColor: "white" }}
                    _focus={{ outline: "none", boxShadow: "none", borderColor: "white" }}
                    _active={{ bg: "transparent", borderColor: "white" }}
                    onClick={handleMenuToggle}
                />
                <MenuList>
                    <MenuItem>
                        <Link href={"/"}>
                            <Text
                                as="p"
                                fontSize="20px"
                                fontWeight="500"
                                color="#316be2"
                            >
                                Lista de Jogos
                            </Text>
                        </Link>
                    </MenuItem>
                </MenuList>
            </Menu>
        </HStack>
    );
}
