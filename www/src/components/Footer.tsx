import React from "react";
import { Box, Flex, IconButton, Text } from "@radix-ui/themes";
import { get_sitemap } from "constants/AppConstants";

const Footer: React.FC = () => {
  const sitemap_url = get_sitemap();
  const year = new Date().getFullYear();

  return (
    <Box pt="9" mt="auto">
      <footer className="footer">
        <div className="seperator"/>
        <Box style={{ backgroundColor: "var(--white)" }}>
          <Flex justify="center" gap="6" py="5">
            <IconButton asChild variant="ghost" size="3" aria-label="Request my CV">
              <a href="mailto:stephenHamilton@mac.com?subject=CV request">
                <span className="icon-mail"/>
              </a>
            </IconButton>
            <IconButton asChild variant="ghost" size="3" aria-label="Twitter">
              <a href="http://twitter.com/shamiltonUK" target="_blank" rel="noreferrer">
                <span className="icon-twitter-square"/>
              </a>
            </IconButton>
            <IconButton asChild variant="ghost" size="3" aria-label="Github">
              <a href="https://github.com/pieshop" target="_blank" rel="noreferrer">
                <span className="icon-github"/>
              </a>
            </IconButton>
            <IconButton asChild variant="ghost" size="3" aria-label="LinkedIn">
              <a href="http://uk.linkedin.com/in/stephenhamilton" target="_blank" rel="noreferrer">
                <span className="icon-linkedin"/>
              </a>
            </IconButton>
            <IconButton asChild variant="ghost" size="3" aria-label="Sitemap">
              <a href={sitemap_url} target="_blank" rel="noreferrer">
                <span className="icon-sitemap"/>
              </a>
            </IconButton>
          </Flex>
        </Box>
        <div className="seperator"/>
        <Flex justify="center" py="5">
          <Text size="1" color="gray">© {year} Stephen Hamilton</Text>
        </Flex>
      </footer>
    </Box>
  );
};

export default Footer;
