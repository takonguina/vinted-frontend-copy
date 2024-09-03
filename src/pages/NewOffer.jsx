import { useState } from "react";
import "./NewOffer.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewOffer = ({ token }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setcolor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);

  const handleNewOffer = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/offer/publish`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        navigate(`/offer/${response.data._id}`);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="new-offer-container">
      <div className="new-offer-content">
        <form onSubmit={handleNewOffer}>
          <div className="text-input-section">
            <div className="publish-input-container">
              <label htmlFor="picture-file">+ Ajouter photo</label>
              {file && (
                <img src={URL.createObjectURL(file)} alt="preview"></img>
              )}
              <input
                type="file"
                id="picture-file"
                style={{ display: "none" }}
                className="file-input"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>
          </div>
          {/* FIRST SECTION */}
          <div className="text-input-section">
            <div className="publish-input-container">
              <p className="publish-title">Title</p>
              <input
                type="text"
                className="publish-input"
                placeholder="ex: Chemise Sézane vert"
                onChange={(e) => {
                  const value = e.target.value;
                  setTitle(value);
                }}
              />
            </div>
            <div className="publish-input-container">
              <p className="publish-title">Décris ton article</p>
              <input
                type="text"
                className="publish-input"
                placeholder="ex: Porté quelques fois, taille correctement"
                onChange={(e) => {
                  const value = e.target.value;
                  setDescription(value);
                }}
              />
            </div>
          </div>
          {/* SECOND SECTION */}
          <div className="text-input-section">
            <div className="publish-input-container">
              <p className="publish-title">Marque</p>
              <input
                type="text"
                className="publish-input"
                placeholder="ex: Zara"
                onChange={(e) => {
                  const value = e.target.value;
                  setBrand(value);
                }}
              />
            </div>
            <div className="publish-input-container">
              <p className="publish-title">Taille</p>
              <input
                type="text"
                className="publish-input"
                placeholder="ex: L/ 40 / 12"
                onChange={(e) => {
                  const value = e.target.value;
                  setSize(value);
                }}
              />
            </div>
            <div className="publish-input-container">
              <p className="publish-title">Couleur</p>
              <input
                type="text"
                className="publish-input"
                placeholder="ex: Fushia"
                onChange={(e) => {
                  const value = e.target.value;
                  setcolor(value);
                }}
              />
            </div>
            <div className="publish-input-container">
              <p className="publish-title">Etat</p>
              <input
                type="text"
                className="publish-input"
                placeholder="ex: Neuf avec étiquette"
                onChange={(e) => {
                  const value = e.target.value;
                  setCondition(value);
                }}
              />
            </div>
            <div className="publish-input-container">
              <p className="publish-title">Lieu</p>
              <input
                type="text"
                className="publish-input"
                placeholder="ex: Paris"
                onChange={(e) => {
                  const value = e.target.value;
                  setCity(value);
                }}
              />
            </div>
          </div>
          {/* PRICE SECTION */}
          <div className="text-input-section">
            <div className="publish-input-container">
              <p className="publish-title">Prix</p>
              <input
                type="text"
                className="publish-input"
                placeholder="0,00 €"
                onChange={(e) => {
                  const value = e.target.value;
                  setPrice(value);
                }}
              />
            </div>
          </div>
          <div className="form-validation">
            <button className="publish-button" type="submit">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOffer;
