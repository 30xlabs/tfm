import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Container, useThemeUI, Link } from "theme-ui"
import Description from "../components/description"
import MainIcon from "../assets/mainIcon"

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
    <Link
      href="/news-letter" to="" sx={{
        bg: "primary",
        p: "4px",
        color: "accent"
      }}>
      Subscribe for a newsletter
    </Link>
  </footer>
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
