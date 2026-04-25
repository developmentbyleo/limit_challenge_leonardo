import django_filters

from submissions import models


class SubmissionFilterSet(django_filters.FilterSet):
    """Filter set for the submissions list endpoint.

    Implements status, broker, and company search filters.
    """

    status = django_filters.CharFilter(field_name="status", lookup_expr="iexact")
    brokerId = django_filters.NumberFilter(field_name="broker__id")
    companySearch = django_filters.CharFilter(field_name="company__legal_name", lookup_expr="icontains")

    class Meta:
        model = models.Submission
        fields = ["status", "brokerId", "companySearch"]

