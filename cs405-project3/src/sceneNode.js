/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        // Directly compute transformed matrices
        let transformedMvp = MatrixMult(mvp, this.trs.getTransformationMatrix());
        let transformedModelView = MatrixMult(modelView, this.trs.getTransformationMatrix());
        let transformedNormal = MatrixMult(normalMatrix, this.trs.getTransformationMatrix());
        let transformedModel = MatrixMult(modelMatrix, this.trs.getTransformationMatrix());

        // Recursively apply transformations and draw child nodes
        this.children.forEach(child => {
            child.draw(transformedMvp, transformedModelView, transformedNormal, transformedModel);
        });

        // Draw the MeshDrawer, if present
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormal, transformedModel);
        }
    }

    

}