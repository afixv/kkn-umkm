import { HeroUIProvider } from "@heroui/react";

function WebUMKM({ Component, pageProps }) {
  return (
    <HeroUIProvider>
      <Component {...pageProps} />
    </HeroUIProvider>
  );
}

export default WebUMKM;
