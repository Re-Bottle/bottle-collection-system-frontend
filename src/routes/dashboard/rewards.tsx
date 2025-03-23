import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Reward } from "../../types/reward";

function dateValidation(redeemBy: string | null) {
  if (!redeemBy) {
    throw new Error("Redeem by date is required.");
  }

  const redeemByDate = new Date(redeemBy);
  const currentDate = new Date();

  // Check if the date is valid
  if (isNaN(redeemByDate.getTime())) {
    throw new Error("Invalid date format.");
  }

  // Check if the date is in the future
  if (redeemByDate <= currentDate) {
    throw new Error("Redeem by date must be in the future.");
  }

  // Check if the date is not later than the year 3000
  const year3000 = new Date("3000-01-01");
  if (redeemByDate > year3000) {
    throw new Error("Redeem by date must be before the year 3000.");
  }
}

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

  const [error, setError] = useState<string | null>(null); // New error state

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
    if (redeemBy) {
      try {
        dateValidation(redeemBy);
        setError(null); // Reset error if validation passes
      } catch (error: any) {
        setError(error.message); // Set error message to state
        return;
      }
    }
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
        setError("Failed to add reward: " + error.message); // Set error message
      });
  };

  // Update Reward
  const handleUpdateRewardSubmit = () => {
    if (redeemBy) {
      try {
        dateValidation(redeemBy);
        setError(null); // Reset error if validation passes
      } catch (error: any) {
        setError(error.message); // Set error message to state
        return;
      }
    }
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
        setError("Failed to update reward: " + error.message); // Set error message
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
        setError("Failed to delete reward: " + error.message); // Set error message
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
        setError("Failed to fetch rewards: " + error.message); // Set error message
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
              variant="filled"
              label="Reward Name"
              value={""}
              onChange={(e) => setRewardName(e.target.value)}
            />
            <TextField
              required
              fullWidth
              variant="filled"
              label="Reward Description"
              value={""}
              onChange={(e) => setRewardDescription(e.target.value)}
            />
            <TextField
              required
              fullWidth
              variant="filled"
              label="Reward Points"
              type="number"
              value={0}
              onChange={(e) => setRewardPoints(Number(e.target.value))}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Redeem By"
              required
              type="date"
              value={new Date().toISOString().split("T")[0]}
              onChange={(e) => setRedeemBy(e.target.value)}
            />
          </DialogContent>
          {/* Error message */}
          {error && (
            <div
              style={{
                color: "red",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              {error}
            </div>
          )}
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
            Edit Reward
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              fullWidth
              variant="filled"
              label="Reward Name"
              value={rewardName}
              onChange={(e) => setRewardName(e.target.value)}
            />
            <TextField
              required
              fullWidth
              variant="filled"
              label="Reward Description"
              value={rewardDescription}
              onChange={(e) => setRewardDescription(e.target.value)}
            />
            <TextField
              required
              fullWidth
              variant="filled"
              label="Reward Points"
              type="number"
              value={rewardPoints}
              onChange={(e) => setRewardPoints(Number(e.target.value))}
            />
            <TextField
              required
              fullWidth
              variant="filled"
              label="Redeem By"
              type="date"
              value={
                redeemBy
                  ? new Date(redeemBy).toISOString().split("T")[0]
                  : new Date().toISOString().split("T")[0]
              }
              onChange={(e) => setRedeemBy(e.target.value)}
            />
            {/* Error message */}
            {error && (
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                {error}
              </div>
            )}
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
