import { useNavigate } from "react-router-dom";
import {
  CloudUpload as UploadIcon,
  Search as SearchIcon,
  AutoAwesome as VectorIcon,
} from "@mui/icons-material";
import {
  StyledAppBar,
  StyledToolbar,
  LogoContainer,
  StyledTitle,
  NavigationContainer,
  StyledNavButton,
} from "./Header.styles";

export const Header = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/upload-files");
  };

  const handleSearchClick = () => {
    navigate("/search");
  };

  return (
    <StyledAppBar elevation={2}>
      <StyledToolbar>
        <LogoContainer>
          <VectorIcon sx={{ fontSize: 32, color: "white" }} />
          <StyledTitle variant="h5" component="h1">
            AI Vector Search
          </StyledTitle>
        </LogoContainer>

        <NavigationContainer>
          <StyledNavButton
            variant="text"
            startIcon={<UploadIcon />}
            onClick={handleUploadClick}
          >
            Upload
          </StyledNavButton>

          <StyledNavButton
            variant="text"
            startIcon={<SearchIcon />}
            onClick={handleSearchClick}
          >
            Search
          </StyledNavButton>
        </NavigationContainer>
      </StyledToolbar>
    </StyledAppBar>
  );
};
