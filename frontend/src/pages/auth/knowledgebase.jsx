import { useEffect, useState } from "react";
import axios from "axios";

const backend_url = "http://localhost:4000/api/v1";

const Knowledgebase = () => {
  const [inputValue, setInputValue] = useState({
    category: "",
  });

  const { category } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Changed GET to POST and sent the category in the request body
      const response = await axios.get(
        `${backend_url}/access`,
        { category: inputValue.category },
        { withCredentials: true }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
    setInputValue({
      ...inputValue,
      category: "",
    });
  };

  useEffect(() => {
    // Fetch all knowledge data on component mount
    const fetchKnowledgeData = async () => {
      try {
        // Removed the unnecessary spread operator in the URL
        const response = await axios.get(`${backend_url}/access`);
        const { status, data } = response;

        if (status === 200) {
          console.log("Data:", data);
        } else {
          console.log("An error occurred while fetching knowledge data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchKnowledgeData();
  }, []);

  return (
    <div className="form_container">
      <h2>Knowledgebase</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Category</label>
          <input
            onChange={handleOnChange}
            type="text"
            name="category"
            value={category}
            placeholder="Enter a category"
          />
        </div>
        <button type="submit" onClick={handleSubmit} className="Enter button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Knowledgebase;
