var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import WordBox from "./wordbox.js";
// import { fetchList } from "./handlers.js";
import wordList from "./words.js";
import Wall from "./walls.js";
const ratio = window.devicePixelRatio;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.scale(ratio, ratio);
const score_el = document.getElementById("score");
const loading_el = document.querySelector(".loading");
const game_over_el = document.querySelector(".game_over");
let score = 0;
let score_shadow = 0;
let speed = 0;
let play = true;
const time = Date.now();
let words = wordList;
let walls_list = [];
// const getData = async () => {
//   const data = await fetchList();
//   console.log(data);
// };
// getData();
const width = window.innerWidth;
const height = window.innerHeight;
// console.log(width, height);
for (let i = 0; i < 15; i++) {
    const wall = new Wall(i, ctx, (width / 15) * i, height);
    walls_list.push(wall);
}
ctx.canvas.width = width;
ctx.canvas.height = height;
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        loading_el.style.display = "none";
        words = words.map((w) => w[0].toLowerCase() + w.substring(1, w.length));
        const cal_word_idx = () => Math.floor(Math.random() * words.length);
        // ctx.fillStyle = "blue";
        // ctx.fillRect(0, 0, 100, 100);
        let selected_word_list = [];
        // let selected_word: string;
        let wbox;
        let word_boxes = [];
        const create_word_box = () => {
            const selected_word = words[cal_word_idx()];
            selected_word_list.push(selected_word);
            wbox = new WordBox(ctx, selected_word);
            word_boxes.push(wbox);
        };
        create_word_box();
        const animate = () => {
            if (!wbox)
                return;
            ctx.clearRect(0, 0, width, height); //reset
            walls_list.forEach((wall) => {
                wall.draw();
                word_boxes.forEach((box) => {
                    const id = wall.check(box);
                    if (id) {
                        const rm_idx = walls_list.findIndex((wall) => wall.id == id);
                        walls_list.splice(rm_idx, 1);
                        if (walls_list.length == 0) {
                            game_over_el.style.display = "block";
                            play = false;
                        }
                    }
                });
            });
            word_boxes.forEach((wbox) => {
                wbox.animate();
                if (wbox.y > height) {
                    const rm_box_idx = word_boxes.findIndex((box) => box.id == wbox.id);
                    word_boxes.splice(rm_box_idx, 1);
                    const rm_word_idx = selected_word_list.findIndex((word) => word == word);
                    selected_word_list.splice(rm_word_idx, 1);
                    create_word_box();
                }
            });
            if (score_shadow % 10 == 0) {
                setTimeout(() => {
                    create_word_box();
                }, 300);
                score_shadow++;
            }
            requestAnimationFrame(animate);
        };
        animate();
        let typed_words = [];
        document.addEventListener("keydown", (e) => {
            const key = e.key;
            if (!key)
                return;
            typed_words.push(key);
            const correct_typed = typed_words.reduce((acc, cur, idx) => {
                // const sel_lists = selected_word_list.map((selected_word) => [
                //   ...selected_word,
                // ]);
                let corr_word = [];
                corr_word = selected_word_list.filter((sel_list) => [...sel_list][idx] == cur);
                if (corr_word.length == 0)
                    return [];
                acc.push(cur);
                return acc;
            }, []);
            const corr_word = selected_word_list.find((word) => word == correct_typed.join(""));
            if (correct_typed.length == 0)
                typed_words = [];
            if (!corr_word)
                return;
            console.log(corr_word, correct_typed.join(""), selected_word_list);
            if (!play)
                return;
            if (correct_typed.join("") == corr_word) {
                typed_words = [];
                const rm_box_idx = word_boxes.findIndex((box) => box.text == corr_word);
                word_boxes.splice(rm_box_idx, 1);
                create_word_box();
                score++;
                score_shadow = score;
                score_el.innerText = score + "";
                const rm_word_idx = selected_word_list.findIndex((word) => word == word);
                selected_word_list.splice(rm_word_idx, 1);
            }
        });
    });
}
init();
