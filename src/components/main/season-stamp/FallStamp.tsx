import { Stamp } from '@/types/stamp.type';
import React from 'react';

const FallStamp = ({ petal, circle }: Stamp) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20" fill="none">
      <mask id="a" fill={petal}>
        <path
          fillRule="evenodd"
          d="M9.982 0c.743 0 1.415 1.445 1.878 3.058 1.276-1.307 2.74-2.424 3.438-2.021.64.37.503 1.949.101 3.572 1.62-.413 3.195-.56 3.566.082.402.696-.706 2.169-2.005 3.454 1.606.463 3.04 1.133 3.04 1.873 0 .669-1.173 1.272-2.585 1.716 1.087 1.16 1.904 2.374 1.55 2.988-.37.641-1.947.494-3.566.081.402 1.624.54 3.202-.101 3.572-.675.39-2.067-.642-3.312-1.893C11.523 18.269 10.795 20 9.982 20c-.74 0-1.401-1.439-1.853-3.047-1.11 1.013-2.246 1.743-2.831 1.405-.642-.37-.495-1.947-.082-3.566-1.623.402-3.202.54-3.572-.101-.338-.586.396-1.714 1.415-2.816C1.446 11.423 0 10.76 0 10.018c0-.813 1.73-1.54 3.518-2.004-1.242-1.24-2.261-2.621-1.874-3.292.37-.641 1.949-.504 3.572-.102-.413-1.619-.56-3.195.082-3.565.61-.352 1.815.453 2.968 1.53C8.709 1.175 9.313 0 9.982 0Z"
          clipRule="evenodd"
        />
      </mask>
      <path
        fill={petal}
        fillRule="evenodd"
        d="M9.982 0c.743 0 1.415 1.445 1.878 3.058 1.276-1.307 2.74-2.424 3.438-2.021.64.37.503 1.949.101 3.572 1.62-.413 3.195-.56 3.566.082.402.696-.706 2.169-2.005 3.454 1.606.463 3.04 1.133 3.04 1.873 0 .669-1.173 1.272-2.585 1.716 1.087 1.16 1.904 2.374 1.55 2.988-.37.641-1.947.494-3.566.081.402 1.624.54 3.202-.101 3.572-.675.39-2.067-.642-3.312-1.893C11.523 18.269 10.795 20 9.982 20c-.74 0-1.401-1.439-1.853-3.047-1.11 1.013-2.246 1.743-2.831 1.405-.642-.37-.495-1.947-.082-3.566-1.623.402-3.202.54-3.572-.101-.338-.586.396-1.714 1.415-2.816C1.446 11.423 0 10.76 0 10.018c0-.813 1.73-1.54 3.518-2.004-1.242-1.24-2.261-2.621-1.874-3.292.37-.641 1.949-.504 3.572-.102-.413-1.619-.56-3.195.082-3.565.61-.352 1.815.453 2.968 1.53C8.709 1.175 9.313 0 9.982 0Z"
        clipRule="evenodd"
      />
      <path
        fill="#F7CA87"
        d="m11.86 3.058-.192.055.095.331.24-.246-.143-.14Zm3.438-2.021.1-.173-.1.173Zm.101 3.572-.194-.048-.08.325.324-.083-.05-.194Zm3.566.082.173-.1-.174.1ZM16.96 8.145l-.14-.142-.242.24.327.094.055-.192Zm.455 3.589-.06-.19-.304.095.218.232.146-.137Zm1.55 2.988-.174-.1.174.1Zm-3.566.081.05-.193-.324-.083.08.324.194-.048Zm-.101 3.572-.1-.173.1.173Zm-3.312-1.893.142-.141-.248-.249-.088.34.194.05Zm-3.857.471.192-.054-.087-.312-.24.218.135.148Zm-2.831 1.405.1-.174-.1.174Zm-.082-3.566.194.05.083-.324-.325.08.048.194Zm-3.572-.101-.173.1.173-.1Zm1.415-2.816.147.136.222-.24-.315-.089-.054.193Zm.459-3.86.05.193.34-.088-.249-.247-.14.141ZM1.644 4.721l-.173-.1.173.1Zm3.572-.102-.048.195.325.08-.083-.324-.194.05Zm.082-3.565-.1-.173.1.173Zm2.968 1.53-.137.147.232.217.095-.303-.19-.06Zm3.787.418c-.234-.813-.523-1.595-.853-2.177a2.978 2.978 0 0 0-.541-.722c-.196-.18-.423-.304-.677-.304v.4c.117 0 .253.057.406.198.154.141.31.353.464.625.307.543.586 1.29.816 2.09l.385-.11Zm3.345-2.14c-.239-.137-.522-.133-.804-.057-.283.076-.591.23-.906.432-.631.404-1.328 1.022-1.97 1.68l.286.28c.632-.649 1.305-1.243 1.9-1.623.297-.19.566-.322.794-.383.228-.061.39-.045.5.018l.2-.346Zm.195 3.794c.203-.818.342-1.636.347-2.302a2.961 2.961 0 0 0-.109-.892c-.08-.253-.214-.473-.433-.6l-.2.347c.101.059.19.175.252.373s.092.458.09.769c-.005.621-.136 1.404-.335 2.21l.388.095Zm3.545-.066c-.127-.22-.347-.354-.6-.433a2.938 2.938 0 0 0-.89-.103c-.666.008-1.482.152-2.298.36l.099.388c.802-.205 1.584-.34 2.204-.348.31-.004.57.024.767.085.197.062.313.15.371.25l.347-.2ZM17.1 8.287c.655-.647 1.268-1.349 1.669-1.983.2-.317.352-.626.427-.91.075-.282.078-.565-.06-.803l-.346.2c.064.11.08.272.02.502-.061.228-.19.498-.38.797-.377.598-.967 1.275-1.611 1.913l.281.284Zm3.099 1.731c0-.253-.123-.48-.302-.675a2.96 2.96 0 0 0-.717-.539c-.579-.329-1.356-.617-2.165-.851l-.111.384c.796.23 1.539.508 2.078.815.27.153.48.309.62.462.14.153.197.287.197.404h.4Zm-2.725 1.907c.713-.224 1.377-.492 1.867-.794.245-.152.455-.317.606-.497.151-.18.252-.387.252-.616h-.4c0 .106-.046.225-.159.36a2.113 2.113 0 0 1-.51.412c-.448.278-1.077.534-1.776.753l.12.382Zm1.663 2.897c.12-.21.132-.455.083-.702a2.76 2.76 0 0 0-.317-.785c-.307-.546-.795-1.153-1.343-1.738l-.292.274c.539.574 1.003 1.154 1.287 1.66.142.253.235.478.273.667.038.19.018.327-.038.424l.347.2Zm-3.788.175c.816.208 1.632.352 2.298.36.332.005.637-.024.89-.103.253-.078.473-.213.6-.432l-.347-.2c-.058.101-.174.189-.372.25-.197.062-.456.09-.766.086-.62-.008-1.402-.144-2.204-.348l-.1.387Zm.048 3.552c.219-.127.354-.347.433-.6.08-.252.11-.558.109-.891-.005-.667-.144-1.484-.347-2.303l-.388.096c.2.805.33 1.588.335 2.21.002.31-.028.57-.09.768-.063.199-.15.315-.252.373l.2.347Zm-3.554-1.926c.627.63 1.3 1.213 1.906 1.59.303.19.599.332.872.4.272.07.545.069.776-.064l-.2-.347c-.107.062-.261.079-.479.024-.216-.055-.473-.175-.758-.352-.569-.354-1.216-.912-1.833-1.533l-.284.282ZM9.982 20.2c.278 0 .524-.148.732-.357.21-.21.403-.503.579-.84.35-.675.653-1.57.887-2.47l-.388-.101c-.23.887-.523 1.75-.854 2.387-.166.319-.337.571-.507.741-.17.172-.32.24-.449.24v.4Zm-2.046-3.193c.228.811.511 1.59.837 2.17.162.29.34.54.535.72.194.18.42.303.674.303v-.4c-.117 0-.25-.056-.403-.197a2.551 2.551 0 0 1-.457-.621c-.304-.54-.577-1.285-.8-2.083l-.386.108Zm-2.738 1.524c.2.115.433.131.668.09.235-.043.487-.144.745-.283.517-.278 1.092-.726 1.653-1.237l-.27-.296c-.55.502-1.098.925-1.572 1.18a2.178 2.178 0 0 1-.626.241c-.177.032-.306.012-.398-.042l-.2.347Zm-.176-3.788c-.208.816-.352 1.632-.36 2.298-.005.332.025.637.103.89.079.253.213.473.433.6l.2-.347c-.102-.058-.19-.174-.25-.372a2.551 2.551 0 0 1-.086-.766c.007-.62.143-1.402.348-2.204l-.388-.1Zm-3.551.048c.126.219.346.354.6.433.252.08.558.11.89.108.667-.004 1.485-.143 2.303-.346l-.096-.388c-.805.2-1.588.33-2.21.335a2.577 2.577 0 0 1-.768-.09c-.198-.063-.314-.15-.373-.252l-.346.2Zm1.441-3.052c-.514.556-.965 1.128-1.245 1.641-.14.257-.242.509-.285.743-.042.235-.027.467.089.668l.346-.2c-.053-.093-.073-.22-.041-.397.032-.177.114-.386.242-.622.258-.472.683-1.016 1.188-1.561l-.294-.272ZM-.2 10.018c0 .254.124.481.304.676.18.195.432.373.723.536.583.326 1.365.61 2.178.837l.108-.385c-.8-.224-1.548-.498-2.09-.801a2.565 2.565 0 0 1-.625-.459C.257 10.27.2 10.135.2 10.018h-.4ZM3.468 7.82c-.9.234-1.796.536-2.472.888-.337.175-.629.368-.839.578-.21.208-.357.454-.357.732h.4c0-.129.068-.278.24-.45.17-.169.422-.34.741-.506.637-.331 1.5-.625 2.387-.854l-.1-.388ZM1.47 4.622c-.133.23-.134.5-.066.771.067.272.208.566.395.867.373.603.95 1.271 1.577 1.896l.282-.283C3.043 7.258 2.49 6.615 2.14 6.049c-.175-.283-.294-.537-.347-.752-.054-.216-.037-.37.024-.475l-.346-.2Zm3.793-.196c-.818-.202-1.636-.341-2.302-.346a2.962 2.962 0 0 0-.892.108c-.253.08-.473.215-.6.434l.347.2c.059-.102.175-.19.373-.252.198-.063.458-.092.769-.09.621.004 1.404.135 2.21.335l.095-.389ZM5.198.882c-.22.127-.354.347-.433.6a2.938 2.938 0 0 0-.103.89c.008.666.152 1.482.36 2.298l.388-.099c-.205-.803-.34-1.584-.348-2.204a2.55 2.55 0 0 1 .085-.767c.062-.197.15-.313.25-.372l-.2-.346ZM8.402 2.44c-.581-.544-1.184-1.027-1.726-1.33a2.736 2.736 0 0 0-.78-.312C5.65.749 5.405.76 5.197.882l.2.346c.096-.055.232-.075.42-.038.188.038.411.128.662.269.502.28 1.078.739 1.65 1.273l.272-.292ZM9.982-.2c-.229 0-.436.1-.617.252-.18.151-.345.361-.496.606-.303.49-.57 1.155-.794 1.868l.381.12c.22-.7.476-1.328.753-1.778.14-.224.278-.396.413-.51.135-.112.254-.158.36-.158v-.4Z"
        mask="url(#a)"
      />
      <circle cx="9.75" cy="9.75" r="3.75" fill={circle} />
    </svg>
  );
};

export default FallStamp;
