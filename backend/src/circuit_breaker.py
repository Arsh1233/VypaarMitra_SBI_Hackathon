import logging
from tenacity import retry, stop_after_attempt, wait_chain, wait_fixed

logger = logging.getLogger(__name__)

class CircuitBreakerOpenException(Exception):
    pass

class CircuitBreaker:
    """
    Implements a CircuitBreaker pattern using Tenacity.
    Retries 3 times with wait times 2s, 4s, 8s.
    If all attempts fail, it trips the circuit and raises CircuitBreakerOpenException.
    """
    
    @staticmethod
    def get_retry_decorator():
        return retry(
            stop=stop_after_attempt(3),  # 1 initial + 3 retries
            wait=wait_chain(*[wait_fixed(1), wait_fixed(2)]),
            reraise=True
        )

    @classmethod
    def execute(cls, func, *args, **kwargs):
        retry_decorator = cls.get_retry_decorator()
        
        try:
            # Wrap the function with the retry decorator
            decorated_func = retry_decorator(func)
            return decorated_func(*args, **kwargs)
        except Exception as e:
            logger.error(f"Circuit tripped! All retries failed. Error: {e}")
            raise CircuitBreakerOpenException(f"Circuit breaker tripped due to: {e}")
