import image from "../assets/news.png";

const NewsItem = ({ title, description, src, url }) => {
  return (
    <>
      <div
        className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2"
        style={{ maxWidth: "345px", maxHeight: "500px"}}
      >
        <img
          src={src?src:image}
          style={{ height: "200px", width: "325px" }}
          className="card-img-top"
          alt="News Thumbnail"
        />
        <div className="card-body">
          <h5 className="card-title">
            {typeof title === "string" ? title.slice(0, 20) : "No Title Available"}
          </h5>
          <p className="card-text">
            {typeof description === "string"
              ? description.slice(0, 50)
              : "Stay updated with breaking news and top stories, tailored for quick and easy reading."}
          </p>
          <a href={url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </div>
      </div> 
    </>
  );
};

export default NewsItem;
