import React, { useEffect, useRef } from 'react';
import RelationGraph, {JsonNode} from 'relation-graph-react';
import { RGJsonData, RGOptions, RGNode, RGLine, RGUserEvent, RelationGraphComponent } from 'relation-graph-react';
import {MyAIModel, dataTypeColorMap} from './VipDemo4AIModel.tsx';
import './models-relationship.scss';

const __graph_json_data: RGJsonData = {
  rootId: 'a',
  nodes: [
    { id: 'm-a', nodeShape: 1, text: 'Load Video', data: {
        options: [
          {name: 'video_path', type: 'string', value: '/data/My-World-1080P.mp4'},
          {name: 'force_rate', type: 'number', value: '10'},
          {name: 'force_size', type: 'boolean', value: '0'},
          {name: 'frame_load_cap', type: 'number', value: '2048'},
          {name: 'skip_first_frames', type: 'number', value: '0'},
        ],
        input: [],
        output: [
          {name: 'current_image', type: 1},
          {name: 'frame_count', type: 1},
        ]
      }
    },
    { id: 'm-b', nodeShape: 1, text: 'Preview Image', data: {
        options: [],
        input: [
          {name: 'image', type: 1}
        ],
        output: []
      }
    },
    { id: 'm-c', nodeShape: 1, text: 'Empty Latent Image', data: {
        options: [],
        input: [
          {name: 'batch_size', type: 2},
          {name: 'width', type: 2},
          {name: 'height', type: 2},
        ],
        output: [
          {name: 'LATENT', type: 5},
        ]
      }
    },
    { id: 'm-d', nodeShape: 1, text: 'Primitive', data: {
        options: [
          {name: 'value', type: 'number', value: '512'},
          {name: 'control_affer_generate', type: 'string', value: 'fixed'},
        ],
        input: [],
        output: [
          {name: 'INT', type: 2},
        ]
      }
    },
    { id: 'm-dd', nodeShape: 1, text: 'Primitive', data: {
        options: [
          {name: 'value', type: 'number', value: '24'},
          {name: 'control_affer_generate', type: 'string', value: 'fixed'},
        ],
        input: [],
        output: [
          {name: 'INT', type: 2},
        ]
      }
    },
    { id: 'm-e', nodeShape: 1, text: 'Primitive', data: {
        options: [
          {name: 'value', type: 'number', value: '688'},
          {name: 'control_affer_generate', type: 'string', value: 'fixed'},
        ],
        input: [],
        output: [
          {name: 'INT', type: 2},
        ]
      }
    },
    { id: 'm-f', nodeShape: 1, text: 'AnimateDiff Loader', color: 'rgba(139,108,46,0.58)', data: {
        options: [
          {name: 'model_name', type: 'string', value: 'diff-v1.safetensors'},
          {name: 'beta_schedule', type: 'string', value: 'sqrt_linearr(AnimateDiff)'},
        ],
        input: [
          {name: 'model', type: 0},
          {name: 'context_options', type: 8},
          {name: 'montion_lora', type: 9},
        ],
        output: [
          {name: 'MODEL', type: 0},
        ]
      }
    },
    { id: 'm-g', nodeShape: 1, text: 'KSampler', data: {
        options: [
          {name: 'steps', type: 'number', value: '30'},
          {name: 'cfg', type: 'number', value: '8.0'},
          {name: 'sampler_name', type: 'string', value: 'dpmpp_sde'},
          {name: 'scheduler', type: 'string', value: 'karras'},
          {name: 'denoise', type: 'number', value: '1.00'},
        ],
        input: [
          {name: 'model', type: 0},
          {name: 'positive', type: 0},
          {name: 'negative', type: 0},
          {name: 'latent_image', type: 1},
          {name: 'seed', type: 2},
        ],
        output: [
          {name: 'LATENT', type: 5},
        ]
      }
    },
    { id: 'm-h', nodeShape: 1, text: 'CLIP Set Last Layer', data: {
        options: [
          {name: 'stop_at_clip_layer', type: 'number', value: '-2'},
        ],
        input: [
          {name: 'clip', type: 3},
        ],
        output: [
          {name: 'CLIP', type: 5},
        ]
      }
    },
    { id: 'm-i', nodeShape: 1, text: 'CLIP Text Encode(Prompt)', color: 'rgba(125,55,53,0.6)', data: {
        options: [
          {name: 'stop_at_clip_layer', type: 'number', value: '-2'},
        ],
        input: [
          {name: 'clip', type: 3},
        ],
        output: [
          {name: 'CONDITIONING', type: 5},
        ]
      }
    },
    { id: 'm-j', nodeShape: 1, text: 'Load Checkpoint', data: {
        options: [
          {name: 'ckp', type: 'string', value: 'vision51_v51VAE_safetensors'},
        ],
        input: [
        ],
        output: [
          {name: 'MODEL', type: 5},
          {name: 'CLIP', type: 3},
          {name: 'VAE', type: 6},
        ]
      }
    },
    { id: 'm-k', nodeShape: 1, text: 'BatchPrompSchedule', data: {
        options: [
          {name: '_textarea', type: 'string', value: `"0" : "yummy food, seafood pizza",
"83" : "student's desk, books, pen, sketchbook, earaser, ruler",
"167" : "jewelery, diamonds, crystals, marbles",
            `},
          {name: 'pre_text', type: 'string', value: 'photoreealistic photography, to'},
          {name: 'app_text', type: 'string', value: 'black white interior,top angl'},
          {name: 'pw_a', type: 'number', value: '0.0'},
          {name: 'pw_b', type: 'number', value: '0.0'},
          {name: 'pw_c', type: 'number', value: '0.0'},
          {name: 'pw_d', type: 'number', value: '0.0'},
        ],
        input: [
          {name: 'clip', type: 5},
          {name: 'max_frames', type: 5},
        ],
        output: [
          {name: 'CONDITIONING', type: 5},
        ]
      }
    },
    { id: 'm-l', nodeShape: 1, text: 'Uniform Context Options', color: 'rgba(139,108,46,0.58)', data: {
        options: [
          {name: 'context_length', type: 'number', value: '0.0'},
          {name: 'context_stride', type: 'number', value: '0.0'},
          {name: 'context_overlap', type: 'number', value: '0.0'},
          {name: 'context_schedule', type: 'string', value: 'uniform'},
          {name: 'closed_loop', type: 'boolean', value: 'false'},
        ],
        input: [
        ],
        output: [
          {name: 'CONTEXT_OPTIONS', type: 5},
        ]
      }
    },
    { id: 'm-m', nodeShape: 1, text: 'Apply ControlNet(Advanced)', color: 'rgba(141,32,141,0.5)', data: {
        options: [
          {name: 'strength', type: 'number', value: '1.0'},
          {name: 'start_percent', type: 'number', value: '0.000'},
          {name: 'end_percent', type: 'number', value: '1.000'},
        ],
        input: [
          {name: 'positive', type: 5},
          {name: 'negative', type: 5},
          {name: 'control_net', type: 4},
          {name: 'image', type: 4},
        ],
        output: [
          {name: 'positive', type: 5},
          {name: 'negative', type: 5},
        ]
      }
    },
    { id: 'm-n', nodeShape: 1, text: 'Apply ControlNet(Advanced)', color: 'rgba(141,32,141,0.5)', data: {
        options: [
          {name: 'strength', type: 'number', value: '0.50'},
          {name: 'start_percent', type: 'number', value: '0.002'},
          {name: 'end_percent', type: 'number', value: '0.663'},
        ],
        input: [
          {name: 'positive', type: 5},
          {name: 'negative', type: 5},
          {name: 'control_net', type: 4},
          {name: 'image', type: 4},
        ],
        output: [
          {name: 'positive', type: 5},
          {name: 'negative', type: 5},
        ]
      }
    },
    { id: 'm-o', nodeShape: 1, text: 'Apply ControlNet(Advanced)', color: 'rgba(141,32,141,0.5)', data: {
        options: [
          {name: 'strength', type: 'number', value: '0.45'},
          {name: 'start_percent', type: 'number', value: '0.002'},
          {name: 'end_percent', type: 'number', value: '0.550'},
        ],
        input: [
          {name: 'positive', type: 5},
          {name: 'negative', type: 5},
          {name: 'control_net', type: 4},
          {name: 'image', type: 4},
        ],
        output: [
          {name: 'positive', type: 5},
          {name: 'negative', type: 5},
        ]
      }
    },
    { id: 'm-mc', nodeShape: 1, text: 'Load ControlNet Model(Advanced)', color: 'rgba(141,32,141,0.5)', data: {
        options: [
          {name: 'control_net_name', type: 'string', value: 'control_v11p_sd15_openpose.pth'},
        ],
        input: [
        ],
        output: [
          {name: 'CONTROL_NET', type: 1},
        ]
      }
    },
    { id: 'm-nc', nodeShape: 1, text: 'Load ControlNet Model(Advanced)', color: 'rgba(141,32,141,0.5)', data: {
        options: [
          {name: 'control_net_name', type: 'string', value: 'control_v11p_sd15_depth.pth'},
        ],
        input: [
        ],
        output: [
          {name: 'CONTROL_NET', type: 1},
        ]
      }
    },
    { id: 'm-oc', nodeShape: 1, text: 'Load ControlNet Model(Advanced)', color: 'rgba(141,32,141,0.5)', data: {
        options: [
          {name: 'control_net_name', type: 'string', value: 'control_v11p_sd15_lineart.pth'},
        ],
        input: [
        ],
        output: [
          {name: 'CONTROL_NET', type: 1},
        ]
      }
    },
    { id: 'm-p', nodeShape: 1, text: 'Load VAE', data: {
        options: [
          {name: 'vae_name', type: 'string', value: 'vae-ft-mse-840000.safetensors'},
        ],
        input: [
        ],
        output: [
          {name: 'VAE', type: 5},
        ]
      }
    },
    { id: 'm-q', nodeShape: 1, text: 'VAE Decode', data: {
        options: [
        ],
        input: [
          {name: 'samples', type: 5},
          {name: 'vae', type: 5},
        ],
        output: [
          {name: 'IMAGE', type: 5},
        ]
      }
    },
    { id: 'm-r', nodeShape: 1, text: 'Video Combine', color: 'rgba(50,58,132,0.65)', data: {
        options: [
          {name: 'frome_rate', type: 'number', value: '10'},
          {name: 'loop_count', type: 'number', value: '0'},
        ],
        input: [
          {name: 'images', type: 5},
        ],
        output: [
          {name: 'GIF', type: 5},
        ]
      }
    },
    { id: 'm-final', nodeShape: 1, text: 'Video Combine', color: 'rgba(50,58,132,0.65)', data: {
        options: [
          {name: '_image', type: 'string', value: 'https://relation-graph.com/demo-images/open-all-close-all.gif'},
        ],
        input: [
          {name: 'GIF', type: 5},
        ],
        output: [
        ]
      }
    },
    { id: 'm-s', nodeShape: 1, text: 'Normal Lineart', data: {
        options: [
          {name: 'coarse', type: 'string', value: 'disable'},
          {name: 'resolution', type: 'number', value: '512'},
        ],
        input: [
          {name: 'image', type: 5},
        ],
        output: [
          {name: 'IMAGE', type: 6},
        ]
      }
    },
    { id: 'm-t', nodeShape: 1, text: 'Zoe - Depth Map', data: {
        options: [
          {name: 'resolution', type: 'number', value: '512'},
        ],
        input: [
          {name: 'image', type: 5},
        ],
        output: [
          {name: 'IMAGE', type: 6},
        ]
      }
    },
    { id: 'm-u', nodeShape: 1, text: 'MediaPipe-FaceMeshPreprocessor', data: {
        options: [
          {name: 'max_faces', type: 'number', value: '2'},
          {name: 'min_confidence', type: 'number', value: '0.50'},
          {name: 'resolution', type: 'number', value: '512'},
        ],
        input: [
          {name: 'image', type: 5},
        ],
        output: [
          {name: 'IMAGE', type: 6},
        ]
      }
    },
    { id: 'm-v', nodeShape: 1, text: 'Upscale Image', data: {
        options: [
          {name: 'upscale_method', type: 'string', value: 'nearest-exact'},
          {name: 'ccrop', type: 'string', value: 'center'},
        ],
        input: [
          {name: 'image', type: 5},
          {name: 'width', type: 5},
          {name: 'height', type: 5},
        ],
        output: [
          {name: 'IMAGE', type: 6},
        ]
      }
    },
  ],
  lines: [],
  elementLines: []
};
const modelRelations = [
  { output_model: 'm-d', output_param_name: 'INT', input_model: 'm-c', input_param_name: 'width' },
  { output_model: 'm-e', output_param_name: 'INT', input_model: 'm-c', input_param_name: 'height' },
  { output_model: 'm-dd', output_param_name: 'INT', input_model: 'm-g', input_param_name: 'seed' },
  { output_model: 'm-a', output_param_name: 'frame_count', input_model: 'm-c', input_param_name: 'batch_size' },
  { output_model: 'm-a', output_param_name: 'current_image', input_model: 'm-b', input_param_name: 'image' },
  { output_model: 'm-c', output_param_name: 'LATENT', input_model: 'm-g', input_param_name: 'latent_image' },
  { output_model: 'm-f', output_param_name: 'MODEL', input_model: 'm-g', input_param_name: 'model' },
  { output_model: 'm-j', output_param_name: 'CLIP', input_model: 'm-h', input_param_name: 'clip' },
  { output_model: 'm-j', output_param_name: 'CLIP', input_model: 'm-i', input_param_name: 'clip' },
  { output_model: 'm-j', output_param_name: 'MODEL', input_model: 'm-f', input_param_name: 'model' },
  { output_model: 'm-a', output_param_name: 'frame_count', input_model: 'm-k', input_param_name: 'max_frames' },
  { output_model: 'm-h', output_param_name: 'CLIP', input_model: 'm-k', input_param_name: 'clip' },
  { output_model: 'm-l', output_param_name: 'CONTEXT_OPTIONS', input_model: 'm-f', input_param_name: 'context_options' },
  { output_model: 'm-i', output_param_name: 'CONDITIONING', input_model: 'm-m', input_param_name: 'negative' },
  { output_model: 'm-k', output_param_name: 'CONDITIONING', input_model: 'm-m', input_param_name: 'positive' },
  { output_model: 'm-m', output_param_name: 'negative', input_model: 'm-n', input_param_name: 'negative' },
  { output_model: 'm-m', output_param_name: 'positive', input_model: 'm-n', input_param_name: 'positive' },
  { output_model: 'm-n', output_param_name: 'negative', input_model: 'm-o', input_param_name: 'negative' },
  { output_model: 'm-n', output_param_name: 'positive', input_model: 'm-o', input_param_name: 'positive' },
  { output_model: 'm-mc', output_param_name: 'CONTROL_NET', input_model: 'm-m', input_param_name: 'control_net' },
  { output_model: 'm-nc', output_param_name: 'CONTROL_NET', input_model: 'm-n', input_param_name: 'control_net' },
  { output_model: 'm-oc', output_param_name: 'CONTROL_NET', input_model: 'm-o', input_param_name: 'control_net' },
  { output_model: 'm-p', output_param_name: 'VAE', input_model: 'm-q', input_param_name: 'vae' },
  { output_model: 'm-g', output_param_name: 'LATENT', input_model: 'm-q', input_param_name: 'samples' },
  { output_model: 'm-q', output_param_name: 'IMAGE', input_model: 'm-r', input_param_name: 'images' },
  { output_model: 'm-s', output_param_name: 'IMAGE', input_model: 'm-o', input_param_name: 'image' },
  { output_model: 'm-t', output_param_name: 'IMAGE', input_model: 'm-n', input_param_name: 'image' },
  { output_model: 'm-u', output_param_name: 'IMAGE', input_model: 'm-m', input_param_name: 'image' },
  { output_model: 'm-u', output_param_name: 'IMAGE', input_model: 'm-t', input_param_name: 'image' },
  { output_model: 'm-v', output_param_name: 'IMAGE', input_model: 'm-u', input_param_name: 'image' },
  { output_model: 'm-v', output_param_name: 'IMAGE', input_model: 'm-s', input_param_name: 'image' },
  { output_model: 'm-a', output_param_name: 'current_image', input_model: 'm-v', input_param_name: 'image' },
  { output_model: 'm-d', output_param_name: 'INT', input_model: 'm-v', input_param_name: 'width' },
  { output_model: 'm-e', output_param_name: 'INT', input_model: 'm-v', input_param_name: 'height' },
  { output_model: 'm-r', output_param_name: 'GIF', input_model: 'm-final', input_param_name: 'GIF' }
];

const ModelsRelationship = () => {
  const graphRef = useRef<RelationGraphComponent>(null);

  const graphOptions: RGOptions = {
    debug: false,
    defaultJunctionPoint: 'border',
    backgroundColor: '#222222',
    defaultNodeColor: 'rgba(100, 100, 100, 0.5)',
    placeOtherNodes: false,
    placeSingleNode: false,
    'defaultLineMarker': {
      'markerWidth': 20,
      'markerHeight': 20,
      'refX': 3,
      'refY': 3,
      'data': 'M 0 0, V 6, L 4 3, Z'
    },
    layout: {
      layoutName: 'fixed'
    }
  };

  const showGraph = async () => {
    const getModel = (modelId: string) => {
      return __graph_json_data.nodes.find(model => model.id === modelId);
    };
    const getModelOutputParam = (model: JsonNode, outputParamName: string) => {
      return model.data?.output.find(param => param.name === outputParamName);
    };
    const getModelInputParam = (model: JsonNode, inputParamName: string) => {
      return model.data?.input.find(param => param.name === inputParamName);
    };
    __graph_json_data.elementLines = modelRelations.map(relation => {
      const outputModel = getModel(relation.output_model);
      const outputParam = getModelOutputParam(outputModel, relation.output_param_name);
      const inputModel = getModel(relation.input_model);
      const inputParam = getModelInputParam(inputModel, relation.input_param_name);
      inputParam.type = outputParam.type; // fix data bug

      return {
        from: `O_${relation.output_model}-${relation.output_param_name}`,
        fromJunctionPoint: 'right',
        to: `I_${relation.input_model}-${relation.input_param_name}`,
        toJunctionPoint: 'left',
        text: '',
        lineShape: 6,
        lineWidth: 3,
        color: dataTypeColorMap[outputParam.type]
      };
    });
    // Using the position set for the node, it can be adjusted, saved to the database, and then reloaded to be displayed here.
    const nodesPosition = [
      {'id':'m-a','x':-930.1706372723322,'y':-357.62950890917},
      {'id':'m-b','x':-456.66745683694836,'y':-468.67267196080763},
      {'id':'m-c','x':18.272727272727273,'y':-297.27272727272725},
      {'id':'m-d','x':-459.07692307692304,'y':-383.7692307692307},
      {'id':'m-dd','x':-458.12172573189525,'y':-81.8335901386749},
      {'id':'m-e','x':-459.9230769230769,'y':-240.23076923076923},
      {'id':'m-f','x':502.27272727272725,'y':150},
      {'id':'m-g','x':982.421052631579,'y':-146.69856459330143},
      {'id':'m-h','x':498.14285714285717,'y':-301.29870129870125},
      {'id':'m-i','x':503,'y':-158.63636363636365},
      {'id':'m-j','x':15.420875420875419,'y':-173.28956228956224},
      {'id':'m-k','x':-22.447552447552397,'y':-3.681688681688712},
      {'id':'m-l','x':-456.8423948932424,'y':72.69742719892274},
      {'id':'m-m','x':16.882352941176407,'y':-545.5347593582887},
      {'id':'m-n','x':495.5050505050505,'y':-550.5555555555555},
      {'id':'m-o','x':976.8311688311688,'y':-554.1428571428571},
      {'id':'m-mc','x':18.012987012987004,'y':-684.6883116883117},
      {'id':'m-nc','x':492.012987012987,'y':-688.3766233766235},
      {'id':'m-oc','x':971.7272727272727,'y':-692.1038961038962},
      {'id':'m-p','x':502.5717703349282,'y':-12.715311004784702},
      {'id':'m-q','x':982.2282980177716,'y':-302.84347231715657},
      {'id':'m-r','x':1457.1701982228299,'y':-235.41695146958307},
      {'id':'m-final','x':1977.9903165303608,'y':-245.81082613290445},
      {'id':'m-s','x':967.2727272727273,'y':-845.6818181818181},
      {'id':'m-t','x':494.0909090909091,'y':-817.7272727272727},
      {'id':'m-u','x':17.762845849802375,'y':-868.7193675889328},
      {'id':'m-v','x':-456.2667477450086,'y':-678.9085334954902}
    ];
    __graph_json_data.nodes.forEach((model, index) => {
      const position = nodesPosition.find(n => n.id === model.id);
      if (position) {
        model.x = position.x;
        model.y = position.y;
      } else {
        model.x = index * 50;
        model.y = index * 50;
      }
    });
    const graphInstance = graphRef.current!.getInstance();
    graphInstance.setJsonData(__graph_json_data).then(() => {
      graphInstance.moveToCenter();
      graphInstance.zoomToFit();
    });
  };

  const onNodeClick = (node: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', node.text);
    const graphInstance = graphRef.current!.getInstance();
    const elLines = graphInstance.getElementLines();
    elLines.forEach((line: RGLine) => {
      const keywords = `_${node.id}-`;
      const refed = line.from.includes(keywords) || line.to.includes(keywords);
      line.animation = refed ? 2 : undefined;
    });
  };

  useEffect(() => {
    showGraph();
  }, []);
  return (
    <div>
      <div style={{ height: '100vh' }}>
        <RelationGraph
          ref={graphRef}
          options={graphOptions}
          onNodeClick={onNodeClick}
          nodeSlot={MyAIModel}
        >
            {/* You can put any content here, and it will be displayed in behind of the node. */}
        </RelationGraph>
      </div>
    </div>
  );
};

export default ModelsRelationship;
