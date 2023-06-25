import { Box, HStack, Link, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

import logo from "../../../public/logo.png";
import github from "../../../public/img_github.png";
import instagram from "../../../public/img_instagram.png";
import linkedin from "../../../public/img_linkedin.png";
import twitter from "../../../public/img_twitter.png";

export function Footer() {
    return (
        <HStack as='footer' bg='#1c242c' py="8" justifyContent={'space-between'} flexDirection={['column','column','row','row','row']}>
            <HStack as='section'>
                <Text as='p' fontSize={'24'} fontWeight={'500'} w={'64'} ml='4'>
                    Com os melhores jogos feitos para você!
                </Text>
            </HStack>
            <Stack as='section' alignItems='center' pr={'16'}>
                <HStack as={'div'}>
                    <Link href={"https://github.com/app-masters/"} target="_blank" rel="noopener noreferrer">
                        <Image
                            className="logo"
                            src={github}
                            alt="Logo"
                            width="50"
                            height="50"
                        />
                    </Link>
                    <Link href={"https://www.instagram.com/appmasters.io/"} target="_blank" rel="noopener noreferrer">
                        <Image
                            className="logo"
                            src={instagram}
                            alt="Logo"
                            width="50"
                            height="50"
                        />
                    </Link>
                    <Link href={"https://www.linkedin.com/company/appmasters.io/"} target="_blank" rel="noopener noreferrer">
                        <Image
                            className="logo"
                            src={linkedin}
                            alt="Logo"
                            width="50"
                            height="50"
                        />
                    </Link>
                </HStack>
                <Text as='p' color={'#617582'}>
                    Bem vindo as nossas redes sociais!
                </Text>
                <Text as='p' color={'#617582'}>
                    Siga-nos!
                </Text>
            </Stack>
            <Stack as='section' alignItems='center' mr='8'>
                <Link href={"/"}>
                    <Image
                        className="logo"
                        src={logo}
                        alt="Logo"
                        width="50"
                        height="50"
                    />
                </Link>
                <a href="https://www.appmasters.io" target="_blank" rel="noopener noreferrer">
                    <Text
                        as="p"
                        color="#316be2"
                        transition="color .3s ease-in-out, box-shadow .3s ease-in-out"
                        _hover={{
                            color: "white",
                            boxShadow: "inset 0 -1px 0 white",
                        }}
                        cursor={'pointer'}
                    >
                        Veja Nosso Site
                    </Text>
                </a>
                <Box as="div">
                    <Text as='p' color={'#617582'} w={'56'}>
                        Av. Barão do Rio Branco 3480
                        Sala 501
                    </Text>
                    <Text as='p' color={'#617582'} w={'44'}>
                        Bairro Alto dos Passos, Juiz de Fora - MG
                    </Text>
                    <Text as='p' color={'#617582'}>
                        CEP 36025-020
                    </Text>
                </Box>
            </Stack>
        </HStack>
    );
}