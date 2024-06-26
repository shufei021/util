import { arrayToTree } from '../../src';

describe('arrayToTree', () => {
  it('对象属性值过滤', () => {
    const data = [
        { id: 1, name: 'Node 1', pid: null },
        { id: 2, name: 'Node 2', pid: 1 },
        { id: 3, name: 'Node 3', pid: 1 },
        { id: 4, name: 'Node 4', pid: 2 },
        { id: 5, name: 'Node 5', pid: null },
    ];
    const data1 = [
        { nodeId: 1, nodeName: 'Node 1', parentId: null },
        { nodeId: 2, nodeName: 'Node 2', parentId: 1 },
        { nodeId: 3, nodeName: 'Node 3', parentId: 1 },
        { nodeId: 4, nodeName: 'Node 4', parentId: 2 },
        { nodeId: 5, nodeName: 'Node 5', parentId: null },
        { nodeId: 6, nodeName: 'Node 5', parentId: 5 },
    ];
    expect(arrayToTree(data)).toEqual([
        {
            "id": 1,
            "name": "Node 1",
            "pid": null,
            "children": [
                {
                    "id": 2,
                    "name": "Node 2",
                    "pid": 1,
                    "children": [
                        {
                            "id": 4,
                            "name": "Node 4",
                            "pid": 2,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "Node 3",
                    "pid": 1,
                    "children": []
                }
            ]
        },
        {
            "id": 5,
            "name": "Node 5",
            "pid": null,
            "children": []
        }
    ]);
    expect(arrayToTree(data1, null,'nodeId', 'parentId')).toEqual([
        {
            "nodeId": 1,
            "nodeName": "Node 1",
            "parentId": null,
            "children": [
                {
                    "nodeId": 2,
                    "nodeName": "Node 2",
                    "parentId": 1,
                    "children": [
                        {
                            "nodeId": 4,
                            "nodeName": "Node 4",
                            "parentId": 2,
                            "children": []
                        }
                    ]
                },
                {
                    "nodeId": 3,
                    "nodeName": "Node 3",
                    "parentId": 1,
                    "children": []
                }
            ]
        },
        {
            "nodeId": 5,
            "nodeName": "Node 5",
            "parentId": null,
            "children": [
                {
                    "nodeId": 6,
                    "nodeName": "Node 5",
                    "parentId": 5,
                    "children": []
                }
            ]
        }
    ])
  });
});
