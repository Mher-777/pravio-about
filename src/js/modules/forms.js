import validate from "jquery-validation";
import { config } from "../config";

var forms = {
	mask: () => {

	},

	validate: () => {
		$("form").each((i, el) => {
			var $form = $(el);
			$form.validate({
				errorPlacement: function (error, element) {
					//just nothing, empty
				},
				highlight: (element, errorClass, validClass) => {
					$(element)
						.parent()
						.addClass('is-error')
						.removeClass('is-valid');
					var options = $(element).closest(".flex");
					if ($(element).is(":radio") || $(element).is(":checkbox")) {
						options.addClass("is-error").removeClass("is-valid");
					} else {
						$(element).addClass("is-error").removeClass("is-valid");
					}
				},
				unhighlight: (element, errorClass, validClass) => {
					$(element)
						.parent()
						.removeClass("is-error")
						.addClass("is-valid");
					var options = $(element).closest(".flex");
					if ($(element).is(":radio") || $(element).is(":checkbox")) {
						options.removeClass("is-error").addClass("is-valid");
					} else {
						$(element).removeClass("is-error").addClass("is-valid");
					}
				},
				submitHandler: (form) => {
					var data = $(form).serialize();
					$.ajax({
						type: "POST",
						url: $(form).attr("action"),
						data: data,
						success: function (data) {
							$(form)[0].reset();
						},
					});
				},
				rules: {
					search: {
						required: true,
					},
				},
			});
		});
	},

	events: () => {
		$(".input__field")
			.on("focus", (e) => {
				let $input = $(e.target);
				$input.parent().addClass("is-focus");
			})
			.on("blur change", (e) => {
				let $input = $(e.target);

				if ($input.val() == "") $input.parent().removeClass("is-focus");
			});
	},

	init: () => {
		forms.validate();
		forms.events();
	},
};

export { forms };
