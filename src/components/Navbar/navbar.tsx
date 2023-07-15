import { Button, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, useBreakpointValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { User, signOut } from "firebase/auth"
import { auth } from "config/firebase";

import logo from "../../../public/logo.png";

export function Navbar() {
    const displayText = useBreakpointValue({ base: "none", sm: "text", md: "text" });
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleMenuToggle = () => {
        setMenuOpen(!isMenuOpen);
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setIsLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    if (isLoading) {
        return (
            <HStack
                as="nav"
                py="2"
                pl="4"
                pr={["4", "8", "12", "12", "12"]}
                bg="linear-gradient(178deg, rgba(28,36,44,1) 68%, rgba(0,0,0,1) 100%)"
                justifyContent="space-between"
            >
                <Text color="white">Carregando...</Text>
            </HStack>
        );
    }

    return (
        <HStack
            as="nav"
            py="2"
            pl="4"
            pr={["4", "8", "12", "12", "12"]}
            bg="linear-gradient(178deg, rgba(28,36,44,1) 68%, rgba(0,0,0,1) 100%)"
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
                        transition="color .3s ease-in-out, box-shadow .3s ease-in-out"
                        _hover={{
                            color: "white",
                            boxShadow: "inset 0 -2px 0 white",
                        }}
                    >
                        App Masters Gaming
                    </Text>
                </Link>
            </HStack>

            <Flex
                as="section"
                display={["none", "none", "none", "flex", "flex", "flex"]}
                gap={'4'}
            >
                {!isLoading && user ? (
                    <>
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
                        <Link href={"#"}>
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
                                onClick={logout}
                            >
                                Logout
                            </Text>
                        </Link>
                    </>
                ) : (
                    // Se o usuário não estiver logado, exiba os links de login e cadastro
                    <>
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
                        <Link href={"/login"}>
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
                                Login
                            </Text>
                        </Link>
                        <Link href={"/register"}>
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
                                Cadastro
                            </Text>
                        </Link>
                    </>
                )}
            </Flex>

            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    display={["flex", "flex", "flex", "none", "none", "none"]}
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
                    {!isLoading && user ? (
                        <>
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
                            <MenuItem>
                                <Link href={"#"}>
                                    <Text
                                        as="p"
                                        fontSize="20px"
                                        fontWeight="500"
                                        color="#316be2"
                                        onClick={logout}
                                    >
                                        Logout
                                    </Text>
                                </Link>
                            </MenuItem>
                        </>
                    ) : (
                        <>
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
                            <MenuItem>
                                <Link href={"/login"}>
                                    <Text
                                        as="p"
                                        fontSize="20px"
                                        fontWeight="500"
                                        color="#316be2"
                                        onClick={logout}
                                    >
                                        Login
                                    </Text>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link href={"/register"}>
                                    <Text
                                        as="p"
                                        fontSize="20px"
                                        fontWeight="500"
                                        color="#316be2"
                                        onClick={logout}
                                    >
                                        Cadastro
                                    </Text>
                                </Link>
                            </MenuItem>
                        </>
                    )}
                </MenuList>
            </Menu>
        </HStack>
    );
}
