import Item from "../model/items.js";
import Response from "../model/response.js";

const createResponse = async (req, res) => {
  try {
    const { itemId, answer, name, question, itemName } = req.body;
    console.log(req.body, "req.body============");
    if (!itemId || !answer || !name || !itemName) {
      return res.status(403).json({
        error: "Please fill up all fields",
      });
    }
    if (!req.user || !req.user._id) {
      return res.status(403).json({ error: "User not authenticated" });
    }

    const newResponse = new Response({
      author: req.user._id,
      item: itemId,
      answer,
      name,
      question,
      itemName,
    });

    const savedResponse = await newResponse.save();

    res.status(201).json(savedResponse);
  } catch (error) {
    console.error("Error creating response:", error);
    res.status(500).json({ error: "Could not create response" });
  }
};

const getResponsesForAuthor = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(403).json({ error: "User not authenticated" });
    }

    const authorId = req.user._id;

    const responses = await Response.find({ author: authorId });

    res.status(200).json(responses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const acceptResponse = async (req, res) => {
  try {
    const { responseBack, responseId,contactInfo } = req.body;

    const response = await Response.findByIdAndUpdate(
      responseId,
      { responseBack: responseBack, confirmation: true,contactInfo:contactInfo },
      { new: true }
    );

    if (!response) {
      return res.status(404).json({ error: "Response not found" });
    }

    res.json(response);
  } catch (error) {
    console.error("Error updating responseBack and confirmation fields:", error);
    res.status(500).json({ error: "Could not update responseBack and confirmation fields" });
  }
};

const getResponsesForItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const responses = await Response.find({ item: itemId });

    res.status(200).json(responses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export { createResponse, acceptResponse, getResponsesForAuthor ,getResponsesForItem };
