import Item from "../model/items.js";
import Response from "../model/response.js";

const createResponse = async (req, res) => {
  try {
    const { itemId, answer, name ,question } = req.body;

    if (!itemId || !answer || !name) {
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
      question
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

const acceptResponse=async (req, res) => {
    try {
      const { responseId } = req.params;
      const { responseBack } = req.body;
  
      // Find the response by ID and update responseBack field
      const response = await Response.findByIdAndUpdate(
        responseId,
        { responseBack: responseBack },
        { new: true } // Return the updated response
      );
  
      if (!response) {
        return res.status(404).json({ error: 'Response not found' });
      }
  
      res.json(response);
    } catch (error) {
      console.error('Error updating responseBack field:', error);
      res.status(500).json({ error: 'Could not update responseBack field' });
    }
  }

  export { createResponse, acceptResponse,getResponsesForAuthor };
