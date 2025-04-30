'use client';

import React, { useMemo, useState } from 'react';
import ReactFlow, {
    Background,
    Controls,
    Node,
    Edge,
    NodeChange,
    applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useFlowStore } from '@/store/flowStore';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';
import { useEffect } from 'react';
export default function FlowViewer() {
    const flowData = useFlowStore((state) => state.data);
    const setData = useFlowStore((state) => state.setData);

    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [isClient, setIsClient] = useState(false);


    const [nodes, setNodes] = useState<Node[]>([
        {
            id: '1',
            position: { x: 100, y: 100 },
            data: { label: `Título: ${flowData.section1.title}` },
            type: 'default',
        },
        {
            id: '2',
            position: { x: 300, y: 100 },
            data: { label: `Contenido: ${flowData.section2.content}` },
            type: 'default',
        },
        {
            id: '3',
            position: { x: 500, y: 100 },
            data: { label: `Nota: ${flowData.section3.note}` },
            type: 'default',
        },
    ]);
    const handleNodesChange = (changes: NodeChange[]) => {
        setNodes((nds) => applyNodeChanges(changes, nds));
    };
    const edges: Edge[] = [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
    ];

    const handleNodeClick = (_: unknown, node: Node) => {
        setSelectedNode(node);
        const label = node.data.label;
        const value = label.includes(':') ? label.split(':')[1].trim() : label;
        setInputValue(value);
    };

    const handleSave = () => {
        if (!selectedNode) return;

        const { id } = selectedNode;
        let newLabel = inputValue;
        if (id === '1') {
            setData({
                ...flowData,
                section1: { ...flowData.section1, title: inputValue },
            });
            newLabel = `Titulo: ${inputValue}`;
        } else if (id === '2') {
            setData({
                ...flowData,
                section2: { ...flowData.section2, content: inputValue },
            });
            newLabel = `Contenido: ${inputValue}`;
        } else if (id === '3') {
            setData({
                ...flowData,
                section3: { ...flowData.section3, note: inputValue },
            });
            newLabel = `Nota: ${inputValue}`;
        }

        setNodes((prevNodes) =>
            prevNodes.map((node) =>
                node.id === id
                    ? { ...node, data: { ...node.data, label: newLabel } }
                    : node
            )
        );
        setSelectedNode(null);
    };
    useEffect(() => {
        setIsClient(true);
    }, []);
    if (!isClient) return null; 
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={handleNodesChange}
                fitView
                onNodeClick={handleNodeClick}
            >
                <Background />
                <Controls />
            </ReactFlow>

            <Dialog open={!!selectedNode} onClose={() => setSelectedNode(null)}>
                <DialogTitle>Editar nodo</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Nuevo valor"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        autoFocus
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedNode(null)}>Cancelar</Button>
                    <Button variant="contained" onClick={handleSave}>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
