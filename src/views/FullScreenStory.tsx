import { useParams } from "react-router";
import "../css/FullScreenStories.css";
import { useState } from "react";
import { UserStory } from "../hook/social";
import { storiesFromBackend } from "../components/StoriesCarousel";
import Stories from "react-insta-stories";
import { useNavigate } from "react-router";
import CloseIcon from "@mui/icons-material/Close";

const FullScreenStories = () => {
  //   const [userStory, setUserStory] = useState<UserStory | null>(null);
  const navigate = useNavigate();
  let { storyId } = useParams();
  const userStory = storiesFromBackend.find((story) => story.id === storyId);
  const currentIndex = storiesFromBackend.findIndex((story) => {
    return story.id === storyId;
  });
  let storyCurrentIndex = 0;

  const renderUserStory = (userStoryId: string) => {
    return (
      <Stories
        stories={userStory?.instaStoriesObject}
        defaultInterval={1500}
        width={400}
        height={680}
        currentIndex={0}
        onAllStoriesEnd={onStoryEndHandler}
      />
    );
  };

  const onStoryEndHandler = () => {
    if (currentIndex !== storiesFromBackend.length - 1) {
      const nextId = storiesFromBackend[currentIndex + 1].id;
      storyCurrentIndex = 0;
      navigate(`/story/${nextId ?? ""}`);
    } else {
      navigate(`/social`);
    }
  };

  return (
    <div className="full-screen">
      <CloseIcon
        className="close-icon"
        onClick={(event) => {
          event.stopPropagation();
          navigate(`/social`);
        }}
      />
      <div className="story"> {renderUserStory(storyId)}</div>
    </div>
  );
};

export default FullScreenStories;
