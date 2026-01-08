// EXAMPLE: Inserting into two collections in one controller

const mongoose = require("mongoose");
const workspaceModel = require("../models/workspaceModel");
const workspaceMemberModel = require("../models/workspaceMemberModel");

// Method 1: Sequential Inserts (Simple)
const createWorkspaceWithMember = async (req, res) => {
    try {
        // Insert into first collection (workspace)
        const newWorkspace = await workspaceModel.create({
            workspaceName: req.body.workspaceName,
            workspaceDesc: req.body.workspaceDesc,
            createdBy: req.body.createdBy
        });

        // Insert into second collection (workspaceMember) using the ID from first insert
        const newWorkspaceMember = await workspaceMemberModel.create({
            workspaceId: newWorkspace._id,  // Use the ID from first insert
            members: req.body.members || []
        });

        res.status(201).json({
            msg: "Workspace and members created successfully",
            data: {
                workspace: newWorkspace,
                workspaceMember: newWorkspaceMember
            }
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error occurred",
            error: err.message
        });
    }
};

// Method 2: Parallel Inserts (Faster, but be careful with dependencies)
const createWorkspaceWithMemberParallel = async (req, res) => {
    try {
        // If both inserts are independent, you can do them in parallel
        const [newWorkspace, newWorkspaceMember] = await Promise.all([
            workspaceModel.create({
                workspaceName: req.body.workspaceName,
                workspaceDesc: req.body.workspaceDesc,
                createdBy: req.body.createdBy
            }),
            workspaceMemberModel.create({
                workspaceId: req.body.workspaceId,  // Must be provided in req.body
                members: req.body.members || []
            })
        ]);

        res.status(201).json({
            msg: "Both created successfully",
            data: {
                workspace: newWorkspace,
                workspaceMember: newWorkspaceMember
            }
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error occurred",
            error: err.message
        });
    }
};

// Method 3: Transaction (Best for data consistency - requires MongoDB replica set)
const createWorkspaceWithMemberTransaction = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Insert into first collection
        const newWorkspace = await workspaceModel.create([{
            workspaceName: req.body.workspaceName,
            workspaceDesc: req.body.workspaceDesc,
            createdBy: req.body.createdBy
        }], { session });

        // Insert into second collection using the ID from first
        const newWorkspaceMember = await workspaceMemberModel.create([{
            workspaceId: newWorkspace[0]._id,
            members: req.body.members || []
        }], { session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            msg: "Workspace and members created successfully",
            data: {
                workspace: newWorkspace[0],
                workspaceMember: newWorkspaceMember[0]
            }
        });
    } catch (err) {
        // Rollback on error
        await session.abortTransaction();
        session.endSession();
        
        res.status(500).json({
            msg: "Error occurred, transaction rolled back",
            error: err.message
        });
    }
};

module.exports = {
    createWorkspaceWithMember,
    createWorkspaceWithMemberParallel,
    createWorkspaceWithMemberTransaction
};

