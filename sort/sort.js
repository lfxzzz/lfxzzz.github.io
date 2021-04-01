let array = [];
$("#add").on("click", function () {
	let value = $("#addNum").val();
	array = randomNumber(+value);
	$("#resource").text(array.join(", "));
	$(".result").text("");
});
$("#clear").on("click", function () {
	array = [];
	$("#resource").text("");
	$(".result").text("");
	$("#addNum").val("");
});
$(".run").on("click", function () {
	let res;

	console.time("原生排序执行时间");
	res = nativeSort(array);
	console.timeEnd("原生排序执行时间");
	$(".native").text(res.join(", "));

	console.time("冒泡排序执行时间");
	res = bubbleSort(array);
	console.timeEnd("冒泡排序执行时间");
	$(".mao").text(res.join(", "));

	console.time("快速排序执行时间");
	res = quickSort(array, 0, array.length - 1);
	console.timeEnd("快速排序执行时间");
	$(".kuai").text(res.join(", "));
});

function randomNumber(q) {
	let arr = [];
	let max = q * 3;
	while (q-- > 0) {
		arr.push(parseInt(Math.random() * max));
	}
	return arr;
}

function nativeSort(arr) {
	return arr.sort(function (a, b) {
		return a - b;
	});
}

function bubbleSort(arr) {
	let i, j;
	let flag;
	for (i = 0; i < arr.length; i++) {
		for (j = i; j < arr.length; j++) {
			if (arr[i] > arr[j]) {
				[arr[j], arr[i]] = [arr[i], arr[j]];
			}
		}
	}
	return arr;
}

function quickSort(arr, left, right) {
	if (left >= right) {
		return;
	}
	let i = left,
		j = right,
		key = arr[i];
	while (i < j) {
		while (i < j && arr[j] >= key) {
			j -= 1;
		}
		if (i < j) {
			arr[i] = arr[j];
			i += 1;
		}
		while (i < j && arr[i] < key) {
			i += 1;
		}
		if (i < j) {
			arr[j] = arr[i];
			j -= 1;
		}
	}
	arr[i] = key;
	quickSort(arr, left, i - 1);
	quickSort(arr, i + 1, right);
	return arr;
}

// 希尔排序
function insertionSort(arr) {
	if (arr == null || arr.length <= 1) {
		return arr;
	}
	//希尔排序  升序
	for (var d = Math.floor(arr.length / 2); d > 0; d = Math.floor(d / 2)) {
		//d：增量  7   3   1
		for (var i = d; i < arr.length; i++) {
			//i:代表即将插入的元素角标，作为每一组比较数据的最后一个元素角标
			//j:代表与i同一组的数组元素角标
			for (var j = i - d; j >= 0; j -= d) {
				//在此处-d 为了避免下面数组角标越界
				if (arr[j] > arr[j + d]) {
					// j+d 代表即将插入的元素所在的角标
					//符合条件，插入元素（交换位置）
					var temp = arr[j];
					arr[j] = arr[j + d];
					arr[j + d] = temp;
				}
			}
		}
	}
	return arr;
}

// 归并
function mergeSort(arr) {
	var len = arr.length;
	if (len < 2) {
		return arr;
	}
	var middle = Math.floor(len / 2),
		left = arr.slice(0, middle),
		right = arr.slice(middle);
	returnmerge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
	var result = [];

	while (left.length > 0 && right.length > 0) {
		if (left[0] <= right[0]) {
			result.push(left.shift());
		} else {
			result.push(right.shift());
		}
	}

	while (left.length) result.push(left.shift());

	while (right.length) result.push(right.shift());

	return result;
}
