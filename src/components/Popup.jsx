import React, { useState } from "react";
import { schemaOptions } from "../data";
import { MdKeyboardArrowLeft } from "react-icons/md";
import axios from "axios";
import "./Popup.css";
import Dropdown from "./Dropdown";

const Popup = ({ onClose }) => {
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [selected, setSelected] = useState("");
  const [closing, setClosing] = useState(false); 

  const handleAddSchema = () => {
    if (selected && !schemas.find((s) => s.value === selected)) {
      const option = schemaOptions.find((o) => o.value === selected);
      setSchemas([...schemas, option]);
      setSelected("");
    }
  };

  const handleSchemaChange = (index, newValue) => {
    const updated = [...schemas];
    const option = schemaOptions.find((o) => o.value === newValue);
    updated[index] = option;
    setSchemas(updated);
  };

  const handleSave = async () => {
    if (!segmentName) {
      alert("Please enter a segment name");
      return;
    }

    const payload = {
      segment_name: segmentName,
      schema: schemas.map((item) => ({ [item.value]: item.label })),
    };
    console.log("Payload to send:", payload);

    try {
      const res = await axios.post(
        "https://webhook.site/4c191145-d210-4fec-9f57-3ff2bf234123",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.status === 200) alert("Segment saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save segment");
    }
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); 
  };

  const usedValues = schemas.map((s) => s.value);

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className={`modal ${closing ? "slide-out" : "slide-in"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="topbar">
          <MdKeyboardArrowLeft className="ar_icon" />
          <h1> Saving Segment</h1>
        </div>

        <div className="model_con">
          <div className="model_top">
            <div className="seg_name_con">
              <label>Enter the Name of the Segment:</label>
              <input
                type="text"
                placeholder="Name of the Segment"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />
              <p>
                To save your segment, you need to add the schemas to build the
                query
              </p>
            </div>

            <div className="blue_box">
              {schemas.map((schema, index) => (
                <Dropdown
                  key={index}
                  selectedValue={schema.value}
                  onChange={(val) => handleSchemaChange(index, val)}
                  usedValues={usedValues}
                />
              ))}
            </div>

            
            <div className="dropdown-section">
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option value="">Add schema to segment</option>
                {schemaOptions
                  .filter((opt) => !usedValues.includes(opt.value))
                  .map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
              </select>
              <button className="add_btn" onClick={handleAddSchema}>
                + <span>Add new schema</span>
              </button>
            </div>
          </div>

          <div className="modal_buttons">
            <button className="sts_btn" onClick={handleSave}>
              Save the Segment
            </button>
            <button className="close-btn" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
