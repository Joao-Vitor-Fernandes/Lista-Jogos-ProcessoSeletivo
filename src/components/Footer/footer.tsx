import { Box, HStack, Link, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

import logo from "../../../public/logo.png";
import github from "../../../public/img_github.png";
import instagram from "../../../public/img_instagram.png";
import linkedin from "../../../public/img_linkedin.png";

export function Footer() {
    return (
        <HStack as='footer' bg='#1c242c' py="4" justifyContent={'space-between'} flexDirection={['column','column','column','row','row','row']}>
            <HStack as='section' borderBottom={['1px','1px','1px','0','0']} borderColor={'#617582'} mb={['4','4','4','0','0']}>
                <Text 
                    as='p' 
                    fontSize={['20','20','22','22','24']} 
                    textAlign={['center','center','center','left','left']}
                    fontWeight={'500'} 
                    w={'64'} 
                    ml={['0', '0', '0', '4', '4']} 
                    mb={['4','4','4','0','0']}
                >
                    Com os melhores jogos feitos para você!
                </Text>
            </HStack>
            <Stack 
                as='section' 
                alignItems='center' 
                borderBottom={['1px','1px','1px','0','0']} 
                borderColor={'#617582'}
                pl={['0', '0', '0', '8', '8']}
                mb={['4','4','4','0','0']}
            >
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
                <Text as='p' color={'#617582'} mb={['4','4','4','0','0']}>
                    Siga-nos!
                </Text>
            </Stack>
            <Stack as='section' alignItems='center' mr={['0', '0', '0', '8', '8']}>
                <Link href={"https://www.appmasters.io"}>
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
                    <Text as='p' color={'#617582'} w={['56','56','56','100%','100%']}>
                        Av. Barão do Rio Branco 3480 / 
                        Sala 501
                    </Text>
                    <Text as='p' color={'#617582'} w={['44','44','44','100%','100%']}>
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