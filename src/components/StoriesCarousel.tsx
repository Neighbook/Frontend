import React from "react";
import "../css/Stories.css";
import { Typography } from "@mui/material";
import { UserAvatar } from "./UserAvatar";
import { User } from "../hook/user";
import { useNavigate } from "react-router";
import { Popover } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router";
import defaultPfp from "/asset/images/pfp.png";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { UserStory } from "../hook/social";
import Stories from "react-insta-stories";
import { useAuth } from "./AuthProvider";

/**
 * list of users who have a story
  id: string;
  idUtilisateur: string;
  dateDeCreation: Date;
  instaStoriesObject: any[];
  This can be just imgs, or an array of objects each containing url, duration, type (vid or img), header, seeMore, seeMoreCollapsed and styles
  duration: number;
}
 */
export const storiesFromBackend: UserStory[] = [
  {
    id: "Story0",
    id_utilisateur: "User0",
    instaStoriesObject: [
      {
        url: "imgurl",
        duration: 1500,
        header: {
          heading: "Mohit Karekar",
          subheading: "Posted 30m ago",
          profileImage: "https://picsum.photos/100/100",
        },
      },
    ],
  },
  {
    id: "Story1",
    id_utilisateur: "User1",
  },
  {
    id: "Story2",
    id_utilisateur: "User2",
  },
  {
    id: "Story3",
    id_utilisateur: "User3",
  },
  {
    id: "Story4",
    id_utilisateur: "User4",
  },
  {
    id: "Story5",
    id_utilisateur: "User5",
  },
  {
    id: "Story6",
    id_utilisateur: "User6",
  },
  {
    id: "Story7",
    id_utilisateur: "User7",
  },
  {
    id: "Story8",
    id_utilisateur: "User8",
  },
  {
    id: "Story9",
    id_utilisateur: "User9",
  },
];

interface storyAvatarProps {
  story: UserStory;
}

const UserStoryAvatar = ({ story }: storyAvatarProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const { usersBase, currentUser } = useAuth();
  const handleBrokenImage = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = defaultPfp;
  };
  const user = usersBase?.find((user) => user.id === story.idUtilisateur);

  return (
    <>
      <section className="avatar-detail">
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={anchorEl !== null}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={() => {
            setAnchorEl(null);
          }}
          disableRestoreFocus
        >
          <Typography>
            {user?.nom_utilisateur ?? "Username unavailable"}
          </Typography>
        </Popover>
        <Avatar
          src={user?.photo ?? defaultPfp}
          imgProps={{ onError: handleBrokenImage }}
          onMouseEnter={(e) => {
            setAnchorEl(e.currentTarget);
          }}
          onMouseLeave={() => {
            setAnchorEl(null);
          }}
          onClick={(event) => {
            event.stopPropagation();
            navigate(`/stories/${story.id ?? ""}`);
          }}
          sx={{ "&:hover": { cursor: "pointer" } }}
        />
        <Typography className="avatar-name">
          {user?.nom ?? "Unknown"}
        </Typography>
      </section>
    </>
  );
};

const StoriesCarousel = () => {
  const isSliderDefault = true;
  const handleSlide = (direction) => {
    const slider = document.getElementsByClassName("carousel-body")[0];
    if (direction === "left") slider.scrollBy(-400, 0);
    else slider.scrollBy(400, 0);
  };

  return (
    <section className="check">
      <div className="arrow-btn left-icon" onClick={() => handleSlide("left")}>
        {<ArrowCircleLeftIcon />}
      </div>
      <div
        className="arrow-btn right-icon"
        onClick={() => handleSlide("right")}
      >
        <ArrowCircleRightIcon />
      </div>
      <div className="carousel-body">
        {storiesFromBackend.map((item) => {
          return <UserStoryAvatar story={item} key={item} image={item} />;
        })}
      </div>
    </section>
  );
};

export default StoriesCarousel;
