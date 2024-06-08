import { Pie } from '@ant-design/plots';

export default () =>  {
  const config = {
    data: [
      { type: '未认证', value: 27 },
      { type: '女性', value: 25 },
      { type: '男性', value: 18 },
    ],
    angleField: 'value',
    colorField: 'type',
    padding: 20,
    insetTop:0,
    paddingTop:0,
    radius: 0.9,
    innerRadius: 0.6,
    label: {
      text: (d:any) => (d.value+"%"),
      
      style: {
        fontWeight: 'bold',
      },
      position: 'spider',
    },
    legend: {
      color: {
        title: false,
        position: 'bottom',
        rowPadding: 5,
        layout: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          },
      },
     
      style:{
        //   marginTop:20,
        //   marginLeft: "10%",
        //   paddingLeft:30,
      }
    },
    scale:{ color: { palette: "blues" }},
    annotations: [
      {
        type: 'text',
        style: {
          text: '注册用户\n3441',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 14,
          fontStyle: 'bold',
        },
      },
    ],
  };
  return <Pie {...config} />;
}