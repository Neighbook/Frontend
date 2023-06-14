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
    id: "000022566235",
    id_utilisateur: "dd45d563-afaf-400e-bf9c-7546f45ddbcd",
    instaStoriesObject: [
      {
        url: "https://picsum.photos/100/100",
        duration: 1500,
      },
      {
        url: "https://i.imgur.com/ARMxyC4.png",
        duration: 1500,
      },
    ],
  },
  {
    id: "07845212",
    id_utilisateur: "b22fd551-39f6-40bd-a5a5-d7e92f9b2638",
    instaStoriesObject: [
      {
        url: "https://i.imgur.com/LBRXhIq.jpg",
        type: "image",
      },
      {
        url: "https://i.imgur.com/Zo5Kpnd.mp4",
        type: "video",
      },
    ],
  },
  {
    id: "000022566235756963",
    id_utilisateur: "11092c2a-cb00-45b0-b498-063152f053dc",
    instaStoriesObject: [
      {
        url: "https://i.imgur.com/Zo5Kpnd.mp4",
        type: "video",
      },
      {
        url: "https://i.imgur.com/LBRXhIq.jpg",
        type: "image",
      },
    ],
  },
  {
    id: "00002256",
    id_utilisateur: "f845d114-1a82-47f0-9b99-0468be33e85e",
    instaStoriesObject: [
      {
        url: "https://picsum.photos/100/100",
        duration: 1500,
      },
      {
        url: "https://i.imgur.com/ARMxyC4.png",
        duration: 1500,
      },
      {
        url: "https://i.imgur.com/LBRXhIq.jpg",
        type: "image",
      },
      {
        url: "https://i.imgur.com/ARMxyC4.png",
        duration: 1500,
      },
    ],
  },
  {
    id: "07845218431202",
    id_utilisateur: "b22fd551-39f6-40bd-a5a5-d7e92f9b2638",
    instaStoriesObject: [
      {
        url: "https://i.imgur.com/LBRXhIq.jpg",
        type: "image",
      },
      {
        url: "https://i.imgur.com/Zo5Kpnd.mp4",
        type: "video",
      },
    ],
  },
];

interface storyAvatarProps {
  story: UserStory;
}

const UserStoryAvatar = ({ story }: storyAvatarProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const { usersBase, currentUser, follows } = useAuth();
  const handleBrokenImage = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = defaultPfp;
  };
  const user = usersBase?.find((user) => user.id === story.id_utilisateur);

  story.instaStoriesObject.forEach((instaStoryObj) => {
    instaStoryObj.header = {
      heading: user?.nom + " " + user?.prenom,
      subheading: "Posted 30m ago",
      profileImage: user?.photo ? user.photo : defaultPfp,
    };
  });

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
            navigate(`/story/${story.id ?? ""}`);
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
          console.log(storiesFromBackend);
          return <UserStoryAvatar story={item} key={item.id} image={item} />;
        })}
      </div>
    </section>
  );
};

export default StoriesCarousel;
