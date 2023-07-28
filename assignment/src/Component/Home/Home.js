import axios from "axios";
import style from "./Home.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const [description, setDescription] = useState("");
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState({ post: "", comment: "" });
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
      getAllPosts();
    } else {
      navigate("/login");
    }
  }, []);

  const getAllPosts = async () => {
    const header = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const res = await axios.get(
      "http://74.249.153.209:8081/api/drive/feed-list/64c23dc923ce86c499fb0b15",
      { headers: header }
    );
    setPosts(res?.data?.data);
    console.log(res);
  };

  const handleCreatePost = async () => {
    const data = {
      drive_id: "64c23dc923ce86c499fb0b15",
      description,
      user_id: user._id,
    };

    const header = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
      const res = await axios.post(
        "http://74.249.153.209:8081/api/drive/create-post",
        data,
        { headers: header }
      );
      if (res.data.success) {
        getAllPosts();
        setDescription("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (item) => {
    console.log(item._id);
    const data = {
      id: item._id,
    };
    const header = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
      const res = await axios.delete(
        "http://74.249.153.209:8081/api/drive/delete-post",
        { headers: header, data }
      );
      console.log(res, "delete");
      getAllPosts();
    } catch (error) {
      console.error(error);
      alert("Try again after some time");
    }
  };
  const handleLike = async (item, option) => {
    console.log(item._id);
    const data = {
      id: item._id,
      type: option,
    };
    const header = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
      const res = await axios.post(
        "http://74.249.153.209:8081/api/drive/post-like-dislike",
        data,
        { headers: header }
      );
      getAllPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async (id) => {
    const data = {
      post_id: id,
      comment: id === text.post && text.comment,
    };
    console.log(data);
    const header = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
      const res = await axios.post(
        "http://74.249.153.209:8081/api/drive/add-comment",
        data,
        { headers: header }
      );
      getAllPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <div className={style.container}>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button onClick={handleCreatePost}>Add</button>
      </div>

      <div className={style.postWrapper}>
        {posts.map((item) => {
          return (
            <div className={style.postContainer} key={item._id}>
              <p>{item?.description}</p>
              <button onClick={() => handleDelete(item)}>Delete</button>
              {item.is_liked ? (
                <button onClick={() => handleLike(item, "dislike")}>
                  DisLike
                </button>
              ) : (
                <button onClick={() => handleLike(item, "like")}>Like</button>
              )}
              <div>
                <input
                  value={text.post === item._id ? text.comment : ""}
                  onChange={(e) =>
                    setText({
                      ...text,
                      post: item._id,
                      comment: e.target.value,
                    })
                  }
                />
                <button onClick={() => handleAddComment(item._id)}>
                  Comment
                </button>
                <p>Comment Count : {item.comments_count}</p>
                <p>Like Count : {item.likes_count}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}