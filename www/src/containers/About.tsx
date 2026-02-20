import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Box, Card, Flex, Grid, Heading, Separator, Text } from "@radix-ui/themes";
import { useAppDispatch } from "store/configureStore";
import { DEFAULT_YEAR, get_base_assets_path } from "constants/AppConstants";
import { selectCategory, selectYear } from "store/categories/categoriesActions";
import Utils from "utils/Utils";

const About: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(selectCategory("about") as unknown as { type: string });
    dispatch(selectYear(DEFAULT_YEAR) as unknown as { type: string });
  }, [dispatch]);

  const BASE_ASSETS_URL = get_base_assets_path();
  const experience_years = Utils.convertIntToWords(new Date().getFullYear() - 1996);

  return (
    <motion.div
      className="main_region"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
    >
      <Helmet>
        <title>About Me</title>
        <meta
          name="Description"
          content="Portfolio website for London based interactive developer Stephen Hamilton"
        />
      </Helmet>
      <div className="aboutme">
        <Box className="page-header" style={{ textAlign: "center" }}>
          <Heading size="8" as="h1">
            In a nut shell....
          </Heading>
        </Box>

        <Flex direction="row" gap="4">
          <Box width="200px" p="4">
            <img
              crossOrigin="anonymous"
              className="img-fluid"
              alt="Profile image"
              src={BASE_ASSETS_URL + "/images/about/profile.png"}
            />
          </Box>
          <Flex direction="column" gap="4" p="4">
            <Text as="p" size="4">
              I am a developer with <mark>{experience_years}</mark> years experience (twelve years
              full-time agency) specialising in interactive development using front-end technologies.
              I am also a creative problem-solver and lateral thinker with good communication skills
              and the ability to work well in a team-based environment.
            </Text>
            <Text as="p">
              I actively enjoy experimenting with new technologies whilst keeping up to date with
              current industry trends and best practices, and strive to integrate any learnings into
              future projects.
            </Text>
            <Text as="p">
              I am comfortable working on a broad range of project types in a fast-paced environment.
              I am equally able to handle a large multi-language, multi-format ad unit rollout, a
              complex web or game based project, or investigate and then create a prototype with a
              new technology.
            </Text>
            <Text as="p">
              Over the years I have worked on a wide range of online media, from large scale
              multi-market campaigns and interactive rich media to more targeted bespoke rich media
              executions. During this time I have also worked with most of the major ad-server
              platforms (DoubleClick, Eyeblaster, Flashtalking).
            </Text>
          </Flex>
        </Flex>

        <Separator size="4" my="5" style={{ color: "#000" }}/>

        <Card>
          <Box p="4">
            <Heading size="4">Technologies</Heading>
            <Text color="gray" as="p" mt="2">
              Below is a selection of some of the languages, tools and frameworks I have used over
              the years.
            </Text>
          </Box>

          <Grid columns={{ initial: "1", md: "2" }} gap="4" px="4" pb="4">
            <Card style={{ backgroundColor: "var(--blue-light)" }}>
              <Box p="3">
                <Heading size="4" align="center">
                  SDKs, Frameworks, Libraries
                </Heading>
              </Box>
              <Separator size="4"/>
              <Box p="2">
                <Text>React, Redux, Vue, Backbone, MarionetteJS, JQuery</Text>
              </Box>
              <Separator size="4"/>
              <Box p="2">
                <Text>JSX, SASS, LESS, Stylus, Bootstrap, Handlebars, Mustache</Text>
              </Box>
              <Separator size="4"/>
              <Box p="2">
                <Text>Babel, Webpack, Browserify, RequireJS</Text>
              </Box>
              <Separator size="4"/>
              <Box p="2">
                <Text>RobotLegs, PureMVC</Text>
              </Box>
              <Separator size="4"/>
              <Box p="2">
                <Text>Laravel</Text>
              </Box>
            </Card>
            <Card style={{ backgroundColor: "var(--blue-light)" }}>
              <Box p="3">
                <Heading size="4" align="center">
                  Tools
                </Heading>
              </Box>
              <Separator size="4"/>
              <Box p="2">
                <Text>IntelliJ, Webstorm, XCode, Android Studio, Eclipse, Unity</Text>
              </Box>
              <Separator size="4"/>
              <Box p="2">
                <Text>Subversion, Git</Text>
              </Box>
              <Separator size="4"/>
              <Box p="2">
                <Text>NPM, Grunt/Gulp, Yeoman, Bower, Ant, Bash</Text>
              </Box>
              <Separator size="4"/>
              <Box p="2">
                <Text>Flash Authoring, Photoshop, Illustrator, TexturePacker</Text>
              </Box>
              <Separator size="4"/>
              <Box p="2">
                <Text>Jira</Text>
              </Box>
            </Card>
          </Grid>

          <Grid columns={{ initial: "1", md: "2" }} gap="4" px="4" pb="4">
            <Card style={{ backgroundColor: "var(--blue-light)" }}>
              <Box p="3">
                <Heading size="4" align="center">
                  Languages
                </Heading>
              </Box>
              <Separator size="4"/>
              <Box p="2">
                <Text>Javascript, Typescript, HTML5, CSS3</Text>
              </Box>
              <Separator size="4"/>
              <Box p="2">
                <Text>PHP, MySql, C#</Text>
              </Box>
              <Separator size="4"/>
              <Box p="2">
                <Text>ActionScript 1-3</Text>
              </Box>
            </Card>
            <Card style={{ backgroundColor: "var(--blue-light)" }}>
              <Box p="3">
                <Heading size="4" align="center">
                  Online Media
                </Heading>
              </Box>
              <Separator size="4"/>
              <Box p="2">
                <Text>3rd party ad serving</Text>
              </Box>
              <Separator size="4"/>
              <Box p="2">
                <Text>omniture, doubleclick, tangozebra, mediamind, flashtalking</Text>
              </Box>
              <Separator size="4"/>
              <Box p="2">
                <Text>&nbsp;</Text>
              </Box>
            </Card>
          </Grid>
        </Card>
      </div>
    </motion.div>
  );
};

export default About;
