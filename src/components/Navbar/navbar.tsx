import { Button, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";

import logo from "../../../public/logo.png";

// responsividade:
//     base     sm      md      lg      xl
// ={['flex', 'none', 'none', 'flex', 'flex']}

export function Navbar() {
    const displayText = useBreakpointValue({ base: "none", sm: "text" , md: "text" });
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
            pr={["4", "8", "12", "12", "12"]}
            // bg="gray.800"
            bg="linear-gradient(178deg, rgba(28,36,44,1) 68%, rgba(0,0,0,1) 100%)"
            // bg="linear-gradient(359deg, rgba(28,36,44,1) 6%, rgba(20,4,12,1) 27%)"
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
                        display={displayText}
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
