import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Reward } from "../../types/reward"; // Ensure you have Reward type

export default function Rewards() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [id, setId] = useState<string>("");
  const [rewardName, setRewardName] = useState<string>("");
  const [rewardDescription, setRewardDescription] = useState<string>("");
  const [rewardPoints, setRewardPoints] = useState<number>(0);
  const [redeemBy, setRedeemBy] = useState<string | null>("");

  const [openAddRewardDialog, setOpenAddRewardDialog] =
    useState<boolean>(false);
  const [openUpdateRewardDialog, setOpenUpdateRewardDialog] =
    useState<boolean>(false);
  const [openDeleteRewardDialog, setOpenDeleteRewardDialog] =
    useState<boolean>(false);
  const [rewardToDelete, setRewardToDelete] = useState<Reward | null>(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  // Handlers for Dialogs
  const handleOpenAddRewardDialog = () => setOpenAddRewardDialog(true);
  const handleCloseAddRewardDialog = () => setOpenAddRewardDialog(false);

  const handleOpenUpdateRewardDialog = (reward: Reward) => {
    setId(reward.id);
    setRewardName(reward.rewardName);
    setRewardDescription(reward.rewardDescription);
    setRewardPoints(reward.rewardPoints);
    setOpenUpdateRewardDialog(true);
  };
  const handleCloseUpdateRewardDialog = () => setOpenUpdateRewardDialog(false);

  const handleOpenDeleteRewardDialog = (reward: Reward) => {
    setRewardToDelete(reward);
    setOpenDeleteRewardDialog(true);
  };
  const handleCloseDeleteRewardDialog = () => setOpenDeleteRewardDialog(false);

  // Add Reward
  const handleAddRewardSubmit = () => {
    fetch("http://localhost:3000/reward/createReward", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        rewardName,
        rewardDescription,
        rewardPoints,
        redeemBy,
      }),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        setRewards([...rewards, data]);
        handleCloseAddRewardDialog();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Update Reward
  const handleUpdateRewardSubmit = () => {
    fetch(`http://localhost:3000/reward/updateReward/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rewardName,
        rewardDescription,
        rewardPoints,
        redeemBy,
      }),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((updatedReward) => {
        setRewards(
          rewards.map((reward) =>
            reward.id === updatedReward.id ? updatedReward : reward
          )
        );
        handleCloseUpdateRewardDialog();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Delete Reward
  const handleDeleteRewardSubmit = () => {
    fetch(`http://localhost:3000/reward/deleteReward/${rewardToDelete?.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setRewards(
            rewards.filter((reward) => reward.id !== rewardToDelete?.id)
          );
          handleCloseDeleteRewardDialog();
        } else {
          return Promise.reject(response);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Fetch rewards
  useEffect(() => {
    fetch("http://localhost:3000/reward/getRewards", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        setRewards(data.rewards);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [rewards]);

  return (
    <section
      id="rewards"
      className="bg-light container-fluid py-5 d-flex flex-column align-items-center"
    >
      <div className="container flex-grow-1 d-flex flex-column">
        <div className="d-flex justify-content-between mb-4">
          <h1 className="text-success">Rewards</h1>
          <Button
            variant="outlined"
            color="success"
            size="large"
            onClick={handleOpenAddRewardDialog}
          >
            Add Reward +
          </Button>
        </div>

        {/* Add Reward Dialog */}
        <Dialog open={openAddRewardDialog} onClose={handleCloseAddRewardDialog}>
          <DialogTitle align="center" color="success">
            Add Reward
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              fullWidth
              variant="standard"
              label="Reward Name"
              value={rewardName}
              onChange={(e) => setRewardName(e.target.value)}
            />
            <TextField
              required
              fullWidth
              variant="standard"
              label="Reward Description"
              value={rewardDescription}
              onChange={(e) => setRewardDescription(e.target.value)}
            />
            <TextField
              required
              fullWidth
              variant="standard"
              label="Reward Points"
              type="number"
              value={rewardPoints}
              onChange={(e) => setRewardPoints(Number(e.target.value))}
            />
            <TextField
              fullWidth
              variant="standard"
              label="Redeem By"
              value={redeemBy}
              onChange={(e) => setRedeemBy(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddRewardDialog}>Cancel</Button>
            <Button onClick={handleAddRewardSubmit} variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Update Reward Dialog */}
        <Dialog
          open={openUpdateRewardDialog}
          onClose={handleCloseUpdateRewardDialog}
        >
          <DialogTitle align="center" color="success">
            Update Reward
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              fullWidth
              variant="standard"
              label="Reward Name"
              value={rewardName}
              onChange={(e) => setRewardName(e.target.value)}
            />
            <TextField
              required
              fullWidth
              variant="standard"
              label="Reward Description"
              value={rewardDescription}
              onChange={(e) => setRewardDescription(e.target.value)}
            />
            <TextField
              required
              fullWidth
              variant="standard"
              label="Reward Points"
              type="number"
              value={rewardPoints}
              onChange={(e) => setRewardPoints(Number(e.target.value))}
            />
            <TextField
              fullWidth
              variant="standard"
              label="Redeem By"
              value={redeemBy}
              onChange={(e) => setRedeemBy(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdateRewardDialog}>Cancel</Button>
            <Button onClick={handleUpdateRewardSubmit} variant="contained">
              Update
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Reward Dialog */}
        <Dialog
          open={openDeleteRewardDialog}
          onClose={handleCloseDeleteRewardDialog}
        >
          <DialogTitle align="center" color="error">
            Delete Reward
          </DialogTitle>
          <DialogContent>
            <DialogContentText align="center">
              Are you sure you want to delete this reward?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteRewardDialog}>Cancel</Button>
            <Button
              onClick={handleDeleteRewardSubmit}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* List Rewards */}
        <div className="row">
          {rewards.length === 0 ? (
            <div className="col-12 text-center">
              <h2>No rewards available</h2>
            </div>
          ) : (
            rewards.map((reward) => (
              <div key={reward.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{reward.rewardName}</h5>
                    <p className="card-text">{reward.rewardDescription}</p>
                    <p className="card-text">Points: {reward.rewardPoints}</p>
                    <p className="card-text">Redeem By: {reward.redeemBy}</p>
                    <Button
                      onClick={() => handleOpenUpdateRewardDialog(reward)}
                      color="primary"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleOpenDeleteRewardDialog(reward)}
                      color="error"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
