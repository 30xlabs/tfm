import * as React from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
import { Container, useThemeUI, Link, Button } from "theme-ui"
import Description from "../components/type-writer"
import MainIcon from "../assets/main-icon"

const Header = ({ description }) => (
  <Container sx={{ padding: ["10%", "10%", "4%"], paddingTop: '2% !important', paddingBottom: '2% !important', width: ["80%", "80%", "680px"] }}>
    <center>
      <MainIcon color={useThemeUI().theme.colors.accent} />
      <Description description={description} />
    </center>
  </Container>
);

const Footer = () => (
  <footer style={{ position: "absolute", bottom: "36px", textAlign: "center", width: "100%" }}>
    <Button
      as={'a'}
      onClick={() => navigate(`/news-letter`)}
      sx={{
        bg: "primary",
        p: "4px",
        color: "accent"
      }}>
      Subscribe for a newsletter
    </Button>
  </footer >
);

const Index = () => {
  const siteData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          description
        }
      }
    }
  `);
  const { description } = siteData.site.siteMetadata;
  return (<>
    <center style={{ marginTop: "36px" }}>
      <Header description={description} />
    </center>
    <Footer />
  </>
  );
};

export default Index;
